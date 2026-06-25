const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const config = require("../config");
const password = require("../utils/password");
const jwtUtil = require("../utils/jwt");
const walletProvider = require("../services/walletProvider");
const { uploadBuffer } = require("../config/cloudinary");
const userModel = require("../models/userModel");

function issueToken(user) {
  return jwtUtil.sign({ sub: user.id, email: user.email, userType: user.user_type });
}

function dicebearAvatar(seed) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=0f766e,115e59&textColor=ffffff`;
}

// POST /auth/register
const register = asyncHandler(async (req, res) => {
  const b = req.body;

  if (await userModel.existsByEmailOrUsername(b.email, b.userName)) {
    throw ApiError.conflict("email or username already in use");
  }

  const passwordHash = await password.hash(b.password);
  // Unified wallet model: derive the user's embedded wallet deterministically
  // from their email (same mechanism as off-platform owners), so they can later
  // self-custody / claim it via email magic-link. No server-held private key.
  const pre = await walletProvider.preGenerate(b.email);

  const user = await userModel.create({
    fullName: b.fullName,
    userName: b.userName,
    email: b.email,
    phoneNumber: b.phoneNumber,
    passwordHash,
    userType: b.userType,
    gender: b.gender,
    bio: b.bio,
    avatar: dicebearAvatar(b.fullName),
    walletAddress: pre.address,
    walletEncKey: null,
  });

  res.status(201).json({ token: issueToken(user), user });
});

// POST /auth/login
const login = asyncHandler(async (req, res) => {
  const user = await userModel.findByEmailWithSecret(req.body.email);
  if (!user) throw ApiError.unauthorized("invalid email or password");

  const ok = await password.compare(req.body.password, user.password_hash);
  if (!ok) throw ApiError.unauthorized("invalid email or password");

  res.json({ token: issueToken(user), user: userModel.toPublic(user) });
});

// GET /auth/me
const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

// PATCH /auth/avatar  (auth) — upload a profile picture (max 1 MB, enforced by multer).
const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("no image uploaded");
  if (!config.cloudinaryConfigured) throw ApiError.badRequest("image upload not available: Cloudinary is not configured");
  const url = await uploadBuffer(req.file.buffer, "hybrid-agent/avatars");
  const user = await userModel.updateAvatar(req.user.id, url);
  res.json({ user });
});

// POST /auth/kyc/verify  (Tier 2)
// MVP mock: flips the user to "verified". In production this is a webhook/return
// from a KYC provider (Sumsub / Persona / Onfido) after ID + liveness checks.
const verifyKyc = asyncHandler(async (req, res) => {
  const updated = await userModel.setKyc(req.user.id, "verified", 1);
  res.json({ user: updated });
});

module.exports = { register, login, me, updateAvatar, verifyKyc };
