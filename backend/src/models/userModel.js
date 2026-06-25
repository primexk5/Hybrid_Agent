const { query } = require("../config/db");

// Columns safe to return to clients (never password_hash or wallet_enc_key).
const PUBLIC_COLUMNS = `
  id, full_name, user_name, email, phone_number, user_type, gender, bio, avatar,
  wallet_address, kyc_status, kyc_level, created_at
`;

function toPublic(row) {
  if (!row) return null;
  const { password_hash, wallet_enc_key, ...rest } = row;
  return rest;
}

async function create(user) {
  const { rows } = await query(
    `INSERT INTO users
      (full_name, user_name, email, phone_number, password_hash, user_type, gender, bio, avatar, wallet_address, wallet_enc_key)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING ${PUBLIC_COLUMNS}`,
    [
      user.fullName,
      user.userName,
      user.email,
      user.phoneNumber || null,
      user.passwordHash,
      user.userType,
      user.gender || null,
      user.bio || null,
      user.avatar || null,
      user.walletAddress,
      user.walletEncKey,
    ]
  );
  return rows[0];
}

async function findByEmailWithSecret(email) {
  const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
}

async function existsByEmailOrUsername(email, userName) {
  const { rows } = await query(
    "SELECT 1 FROM users WHERE email = $1 OR user_name = $2 LIMIT 1",
    [email, userName]
  );
  return rows.length > 0;
}

async function updateAvatar(id, url) {
  const { rows } = await query(
    `UPDATE users SET avatar = $1 WHERE id = $2 RETURNING ${PUBLIC_COLUMNS}`,
    [url, id]
  );
  return rows[0] || null;
}

async function setKyc(id, status, level) {
  const { rows } = await query(
    `UPDATE users SET kyc_status = $1, kyc_level = $2 WHERE id = $3 RETURNING ${PUBLIC_COLUMNS}`,
    [status, level, id]
  );
  return rows[0] || null;
}

module.exports = {
  create,
  findByEmailWithSecret,
  findById,
  existsByEmailOrUsername,
  updateAvatar,
  setKyc,
  toPublic,
};
