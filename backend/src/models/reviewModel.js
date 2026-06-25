const { query } = require("../config/db");

// One review per (agent, reviewer) — re-reviewing updates the existing row.
async function upsert(agentId, reviewerId, r) {
  const { rows } = await query(
    `INSERT INTO reviews (agent_id, reviewer_id, rating, communication, professionalism, comment)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (agent_id, reviewer_id) DO UPDATE SET
       rating=EXCLUDED.rating, communication=EXCLUDED.communication,
       professionalism=EXCLUDED.professionalism, comment=EXCLUDED.comment, created_at=now()
     RETURNING id`,
    [agentId, reviewerId, r.rating, r.communication || null, r.professionalism || null, r.comment || null]
  );
  return rows[0].id;
}

async function listByAgent(agentId, limit = 50) {
  const { rows } = await query(
    `SELECT rv.*, u.full_name AS reviewer_name, u.avatar AS reviewer_avatar
     FROM reviews rv LEFT JOIN users u ON u.id = rv.reviewer_id
     WHERE rv.agent_id = $1
     ORDER BY rv.created_at DESC LIMIT $2`,
    [agentId, limit]
  );
  return rows;
}

async function recent(limit = 24) {
  const { rows } = await query(
    `SELECT rv.*, u.full_name AS reviewer_name, u.avatar AS reviewer_avatar,
            a.full_name AS agent_name, a.user_name AS agent_username, a.id AS agent_id
     FROM reviews rv
     LEFT JOIN users u ON u.id = rv.reviewer_id
     LEFT JOIN users a ON a.id = rv.agent_id
     ORDER BY rv.created_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

async function summary(agentId) {
  const { rows } = await query(
    `SELECT COUNT(*)::int AS count,
            COALESCE(AVG(rating), 0)::float        AS rating,
            COALESCE(AVG(communication), 0)::float AS communication,
            COALESCE(AVG(professionalism), 0)::float AS professionalism
     FROM reviews WHERE agent_id = $1`,
    [agentId]
  );
  return rows[0];
}

// Has this reviewer actually interacted (chatted) with the agent?
async function hasInteracted(agentId, reviewerId) {
  const { rows } = await query(
    `SELECT 1 FROM conversations WHERE agent_id = $1 AND buyer_id = $2 LIMIT 1`,
    [agentId, reviewerId]
  );
  return rows.length > 0;
}

async function getForReviewer(agentId, reviewerId) {
  const { rows } = await query(
    `SELECT * FROM reviews WHERE agent_id = $1 AND reviewer_id = $2`,
    [agentId, reviewerId]
  );
  return rows[0] || null;
}

module.exports = { upsert, listByAgent, recent, summary, hasInteracted, getForReviewer };
