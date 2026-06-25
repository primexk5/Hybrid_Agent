const { query } = require("../config/db");

// Find or create the conversation between `buyerId` and the agent of `listing`.
async function getOrCreate(listing, buyerId) {
  const agentId = listing.created_by;
  const existing = await query(
    "SELECT * FROM conversations WHERE listing_id = $1 AND buyer_id = $2",
    [listing.id, buyerId]
  );
  if (existing.rows.length) return existing.rows[0];

  const { rows } = await query(
    `INSERT INTO conversations (listing_id, buyer_id, agent_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [listing.id, buyerId, agentId]
  );
  return rows[0];
}

async function getById(id) {
  const { rows } = await query("SELECT * FROM conversations WHERE id = $1", [id]);
  return rows[0] || null;
}

// True if the user is the buyer or the agent on the conversation.
function isMember(conversation, userId) {
  return conversation && (conversation.buyer_id === userId || conversation.agent_id === userId);
}

// All conversations for a user, with listing title + counterparty + last message.
async function listForUser(userId) {
  const { rows } = await query(
    `SELECT c.*,
            l.title AS listing_title,
            l.image AS listing_image,
            buyer.full_name AS buyer_name,
            agent.full_name AS agent_name,
            agent.avatar    AS agent_avatar,
            (SELECT body FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message,
            (SELECT created_at FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_at
     FROM conversations c
     LEFT JOIN listings l ON l.id = c.listing_id
     LEFT JOIN users buyer ON buyer.id = c.buyer_id
     LEFT JOIN users agent ON agent.id = c.agent_id
     WHERE c.buyer_id = $1 OR c.agent_id = $1
     ORDER BY COALESCE(last_at, c.created_at) DESC`,
    [userId]
  );
  return rows;
}

async function messages(conversationId, limit = 100) {
  const { rows } = await query(
    `SELECT m.*, u.full_name AS sender_name, u.avatar AS sender_avatar
     FROM messages m LEFT JOIN users u ON u.id = m.sender_id
     WHERE m.conversation_id = $1
     ORDER BY m.created_at ASC
     LIMIT $2`,
    [conversationId, limit]
  );
  return rows;
}

async function addMessage(conversationId, senderId, body) {
  const { rows } = await query(
    `INSERT INTO messages (conversation_id, sender_id, body) VALUES ($1, $2, $3) RETURNING *`,
    [conversationId, senderId, body]
  );
  // Re-read with sender info for a consistent shape with messages().
  const { rows: full } = await query(
    `SELECT m.*, u.full_name AS sender_name, u.avatar AS sender_avatar
     FROM messages m LEFT JOIN users u ON u.id = m.sender_id WHERE m.id = $1`,
    [rows[0].id]
  );
  return full[0];
}

module.exports = { getOrCreate, getById, isMember, listForUser, messages, addMessage };
