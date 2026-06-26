const db = require("../config/filebaseDB");
const { v4: uuidv4 } = require("uuid");

const RECORDS = "db/reviews/records/";

function reviewKey(agentId, reviewerId) {
  return `${RECORDS}${agentId}/${reviewerId}.json`;
}

async function upsert(agentId, reviewerId, r) {
  const existing = await db.get(reviewKey(agentId, reviewerId));
  const now = new Date().toISOString();
  const review = {
    id: existing?.id || uuidv4(),
    agent_id: agentId,
    reviewer_id: reviewerId,
    rating: r.rating,
    communication: r.communication || null,
    professionalism: r.professionalism || null,
    comment: r.comment || null,
    created_at: now,
  };
  await db.put(reviewKey(agentId, reviewerId), review);
  return review.id;
}

async function listByAgent(agentId, limit = 50) {
  const userModel = require("./userModel");
  const keys = await db.listKeys(`${RECORDS}${agentId}/`);
  const reviews = await Promise.all(keys.map((k) => db.get(k)));
  const sorted = reviews
    .filter(Boolean)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
  return Promise.all(
    sorted.map(async (rv) => {
      const reviewer = await userModel.findById(rv.reviewer_id);
      return { ...rv, reviewer_name: reviewer?.full_name || null, reviewer_avatar: reviewer?.avatar || null };
    })
  );
}

async function recent(limit = 24) {
  const userModel = require("./userModel");
  const allKeys = await db.listKeys(RECORDS);
  const all = await Promise.all(allKeys.map((k) => db.get(k)));
  const sorted = all
    .filter(Boolean)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
  return Promise.all(
    sorted.map(async (rv) => {
      const [reviewer, agent] = await Promise.all([
        userModel.findById(rv.reviewer_id),
        userModel.findById(rv.agent_id),
      ]);
      return {
        ...rv,
        reviewer_name: reviewer?.full_name || null,
        reviewer_avatar: reviewer?.avatar || null,
        agent_name: agent?.full_name || null,
        agent_username: agent?.user_name || null,
        agent_id: rv.agent_id,
      };
    })
  );
}

async function summary(agentId) {
  const keys = await db.listKeys(`${RECORDS}${agentId}/`);
  const reviews = await Promise.all(keys.map((k) => db.get(k)));
  const valid = reviews.filter(Boolean);
  if (!valid.length) return { count: 0, rating: 0, communication: 0, professionalism: 0 };
  const count = valid.length;
  const avg = (field) => valid.reduce((sum, r) => sum + (r[field] || 0), 0) / count;
  return { count, rating: avg("rating"), communication: avg("communication"), professionalism: avg("professionalism") };
}

async function hasInteracted(agentId, reviewerId) {
  const convKeys = await db.listKeys("db/conversations/records/");
  const convs = await Promise.all(convKeys.map((k) => db.get(k)));
  return convs.some(
    (c) => c && String(c.agent_id) === String(agentId) && String(c.buyer_id) === String(reviewerId)
  );
}

async function getForReviewer(agentId, reviewerId) {
  return db.get(reviewKey(agentId, reviewerId));
}

module.exports = { upsert, listByAgent, recent, summary, hasInteracted, getForReviewer };
