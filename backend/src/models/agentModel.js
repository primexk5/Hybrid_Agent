const { query } = require("../config/db");

// Public agent fields + aggregate stats, ranked for the leaderboard.
const SELECT = `
  SELECT u.id, u.full_name, u.user_name, u.avatar, u.bio, u.kyc_status,
         COALESCE(AVG(r.rating), 0)::float AS rating,
         COUNT(DISTINCT r.id)::int         AS review_count,
         (SELECT COUNT(*) FROM listings l WHERE l.created_by = u.id)::int AS listing_count,
         (SELECT COUNT(*) FROM deals d
            WHERE d.agent_address = LOWER(u.wallet_address) AND d.state = 'completed')::int AS sales_count
  FROM users u
  LEFT JOIN reviews r ON r.agent_id = u.id
  WHERE u.user_type = 'agent'
  GROUP BY u.id
`;

async function leaderboard() {
  const { rows } = await query(
    `${SELECT} ORDER BY rating DESC, review_count DESC, sales_count DESC, u.created_at ASC`
  );
  return rows;
}

async function getById(id) {
  const { rows } = await query(
    `SELECT u.id, u.full_name, u.user_name, u.avatar, u.bio, u.kyc_status,
            COALESCE(AVG(r.rating), 0)::float AS rating,
            COUNT(DISTINCT r.id)::int         AS review_count,
            (SELECT COUNT(*) FROM listings l WHERE l.created_by = u.id)::int AS listing_count,
            (SELECT COUNT(*) FROM deals d
               WHERE d.agent_address = LOWER(u.wallet_address) AND d.state = 'completed')::int AS sales_count
     FROM users u
     LEFT JOIN reviews r ON r.agent_id = u.id
     WHERE u.id = $1
     GROUP BY u.id`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { leaderboard, getById };
