const db = require("../config/filebaseDB");
const { v4: uuidv4 } = require("uuid");

const CONV_RECORDS = "db/conversations/records/";
const CONV_LB_IDX = "db/conversations/listing-buyer/";
const CONV_USER_IDX = "db/conversations/user-index/";
const MSG_PREFIX = "db/messages/";

async function getOrCreate(listing, buyerId) {
  const idxKey = `${CONV_LB_IDX}${listing.id}/${buyerId}.json`;
  const existing = await db.get(idxKey);
  if (existing) {
    const conv = await db.get(`${CONV_RECORDS}${existing.id}.json`);
    if (conv) return conv;
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  const conv = {
    id,
    listing_id: listing.id,
    buyer_id: buyerId,
    agent_id: listing.created_by,
    created_at: now,
  };

  await db.put(`${CONV_RECORDS}${id}.json`, conv);
  await db.put(idxKey, { id });
  await db.put(`${CONV_USER_IDX}${buyerId}/${id}.json`, {});
  await db.put(`${CONV_USER_IDX}${listing.created_by}/${id}.json`, {});
  return conv;
}

async function getById(id) {
  return db.get(`${CONV_RECORDS}${id}.json`);
}

function isMember(conversation, userId) {
  return (
    conversation &&
    (String(conversation.buyer_id) === String(userId) ||
      String(conversation.agent_id) === String(userId))
  );
}

async function listForUser(userId) {
  const userModel = require("./userModel");
  const keys = await db.listKeys(`${CONV_USER_IDX}${userId}/`);
  const convIds = keys.map((k) => k.split("/").pop().replace(".json", ""));
  const convs = await Promise.all(convIds.map((id) => db.get(`${CONV_RECORDS}${id}.json`)));

  const enriched = await Promise.all(
    convs.filter(Boolean).map(async (conv) => {
      const [listing, buyer, agent, msgs] = await Promise.all([
        db.get(`db/listings/records/${conv.listing_id}.json`),
        userModel.findById(conv.buyer_id),
        userModel.findById(conv.agent_id),
        messages(conv.id, 1),
      ]);
      return {
        ...conv,
        listing_title: listing?.title || null,
        listing_image: listing?.image || null,
        buyer_name: buyer?.full_name || null,
        agent_name: agent?.full_name || null,
        agent_avatar: agent?.avatar || null,
        last_message: msgs[0]?.body || null,
        last_at: msgs[0]?.created_at || conv.created_at,
      };
    })
  );
  return enriched.sort((a, b) => new Date(b.last_at) - new Date(a.last_at));
}

async function messages(conversationId, limit = 100) {
  const keys = await db.listKeys(`${MSG_PREFIX}${conversationId}/`);
  const msgs = await Promise.all(keys.map((k) => db.get(k)));
  return msgs
    .filter(Boolean)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .slice(0, limit);
}

async function addMessage(conversationId, senderId, body) {
  const userModel = require("./userModel");
  const id = uuidv4();
  const now = new Date().toISOString();
  const sender = await userModel.findById(senderId);
  const msg = {
    id,
    conversation_id: conversationId,
    sender_id: senderId,
    body,
    created_at: now,
    sender_name: sender?.full_name || null,
    sender_avatar: sender?.avatar || null,
  };
  await db.put(`${MSG_PREFIX}${conversationId}/${id}.json`, msg);
  return msg;
}

module.exports = { getOrCreate, getById, isMember, listForUser, messages, addMessage };
