const db = require("../config/filebaseDB");
const { v4: uuidv4 } = require("uuid");

const RECORDS = "db/users/records/";
const EMAIL_IDX = "db/users/email/";
const USERNAME_IDX = "db/users/username/";

function toPublic(user) {
  if (!user) return null;
  const { password_hash, wallet_enc_key, ...rest } = user;
  return rest;
}

function encodeEmail(email) {
  return encodeURIComponent(email.toLowerCase());
}
function encodeUsername(username) {
  return encodeURIComponent(username.toLowerCase());
}

async function create(u) {
  const id = uuidv4();
  const now = new Date().toISOString();
  const user = {
    id,
    full_name: u.fullName,
    user_name: u.userName,
    email: u.email,
    phone_number: u.phoneNumber || null,
    password_hash: u.passwordHash,
    user_type: u.userType,
    gender: u.gender || null,
    bio: u.bio || null,
    avatar: u.avatar || null,
    wallet_address: u.walletAddress || null,
    wallet_enc_key: u.walletEncKey || null,
    kyc_status: "unverified",
    kyc_level: 0,
    created_at: now,
  };
  await db.put(`${RECORDS}${id}.json`, user);
  await db.put(`${EMAIL_IDX}${encodeEmail(u.email)}.json`, { id });
  await db.put(`${USERNAME_IDX}${encodeUsername(u.userName)}.json`, { id });
  return toPublic(user);
}

async function findByEmailWithSecret(email) {
  const idx = await db.get(`${EMAIL_IDX}${encodeEmail(email)}.json`);
  if (!idx) return null;
  return db.get(`${RECORDS}${idx.id}.json`);
}

async function findById(id) {
  const user = await db.get(`${RECORDS}${id}.json`);
  return user ? toPublic(user) : null;
}

async function existsByEmailOrUsername(email, userName) {
  const [e, u] = await Promise.all([
    db.get(`${EMAIL_IDX}${encodeEmail(email)}.json`),
    db.get(`${USERNAME_IDX}${encodeUsername(userName)}.json`),
  ]);
  return !!(e || u);
}

async function updateAvatar(id, url) {
  const user = await db.get(`${RECORDS}${id}.json`);
  if (!user) return null;
  user.avatar = url;
  await db.put(`${RECORDS}${id}.json`, user);
  return toPublic(user);
}

async function setKyc(id, status, level) {
  const user = await db.get(`${RECORDS}${id}.json`);
  if (!user) return null;
  user.kyc_status = status;
  user.kyc_level = level;
  await db.put(`${RECORDS}${id}.json`, user);
  return toPublic(user);
}

async function findAllAgents() {
  const all = await db.getAll(RECORDS);
  return all.filter((u) => u.user_type === "agent").map(toPublic);
}

async function findAll() {
  return db.getAll(RECORDS);
}

module.exports = {
  create,
  findByEmailWithSecret,
  findById,
  existsByEmailOrUsername,
  updateAvatar,
  setKyc,
  toPublic,
  findAllAgents,
  findAll,
};
