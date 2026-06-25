const jwtUtil = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const userModel = require("../models/userModel");

// Verify the Bearer token and attach the fresh user record to req.user.
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw ApiError.unauthorized("missing bearer token");

    let payload;
    try {
      payload = jwtUtil.verify(token);
    } catch {
      throw ApiError.unauthorized("invalid or expired token");
    }

    const user = await userModel.findById(payload.sub);
    if (!user) throw ApiError.unauthorized("user no longer exists");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

// Tier 2: gate money-moving actions behind a verified KYC status.
function requireKyc(req, res, next) {
  if (!req.user) return next(ApiError.unauthorized());
  if (req.user.kyc_status !== "verified") {
    return next(ApiError.forbidden("identity verification required to transact"));
  }
  next();
}

module.exports = { requireAuth, requireKyc };
