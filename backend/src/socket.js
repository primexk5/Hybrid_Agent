const { Server } = require("socket.io");
const jwtUtil = require("./utils/jwt");
const config = require("./config");
const chatModel = require("./models/chatModel");

const room = (conversationId) => `conv:${conversationId}`;

// Attach a Socket.IO server to the given HTTP server. Auth is via the JWT
// passed in the handshake; clients join a room per conversation and exchange
// chat messages, which are persisted before broadcast.
function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: config.corsOrigin, credentials: true },
  });

  // Authenticate every socket from its handshake token.
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("auth token required"));
    try {
      const payload = jwtUtil.verify(token);
      socket.data.userId = payload.sub;
      next();
    } catch {
      next(new Error("invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;

    // Personal room: lets us push new-message notifications to this user on any
    // page, even when they haven't opened the specific conversation.
    socket.join(`user:${userId}`);

    // Join a conversation room (only if you're a member).
    socket.on("conversation:join", async (conversationId, ack) => {
      try {
        const conv = await chatModel.getById(conversationId);
        if (!conv || !chatModel.isMember(conv, userId)) {
          return ack?.({ ok: false, error: "not a member" });
        }
        socket.join(room(conversationId));
        ack?.({ ok: true });
      } catch {
        ack?.({ ok: false, error: "join failed" });
      }
    });

    socket.on("conversation:leave", (conversationId) => {
      socket.leave(room(conversationId));
    });

    // Send a message: validate membership, persist, broadcast to the room.
    socket.on("message:send", async ({ conversationId, body }, ack) => {
      try {
        const text = (body || "").trim();
        if (!text) return ack?.({ ok: false, error: "empty message" });
        if (text.length > 2000) return ack?.({ ok: false, error: "message too long" });

        const conv = await chatModel.getById(conversationId);
        if (!conv || !chatModel.isMember(conv, userId)) {
          return ack?.({ ok: false, error: "not a member" });
        }

        const message = await chatModel.addMessage(conversationId, userId, text);
        // To the open thread (both parties viewing it):
        io.to(room(conversationId)).emit("message:new", message);
        // To the recipient's personal room (drives the global notification):
        const recipientId = conv.buyer_id === userId ? conv.agent_id : conv.buyer_id;
        io.to(`user:${recipientId}`).emit("message:notify", { conversationId, message });
        ack?.({ ok: true, message });
      } catch {
        ack?.({ ok: false, error: "send failed" });
      }
    });

    // Typing indicator (not persisted).
    socket.on("typing", ({ conversationId, typing }) => {
      socket.to(room(conversationId)).emit("typing", { userId, typing });
    });
  });

  return io;
}

module.exports = { initSocket };
