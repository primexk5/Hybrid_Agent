const Joi = require("joi");

const ethAddress = Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).message("must be a valid 0x address");

const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(120).required(),
  userName: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  password: Joi.string().min(6).max(128).required(),
  userType: Joi.string().valid("agent", "owner").required(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  bio: Joi.string().allow("").max(500).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createListingSchema = Joi.object({
  assetType: Joi.string().valid("property", "vehicle").required(),
  listingType: Joi.string().valid("owner_direct", "agent_brokered").required(),
  title: Joi.string().min(2).max(160).required(),
  description: Joi.string().allow("").max(2000).optional(),
  priceUsdc: Joi.number().positive().required(),
  image: Joi.string().uri().optional(),
  // agent-brokered: the authed user is the agent helping an off-platform owner
  // sell. We capture the owner's name + email; the backend pre-generates their
  // smart wallet from the email so the escrow can pay them directly.
  ownerName: Joi.string().max(120).optional(),
  ownerEmail: Joi.string().email().max(160).optional(),
  ownerContact: Joi.string().max(160).optional(),
  ownerAddress: ethAddress.optional(),
  commissionBps: Joi.number().integer().min(1).max(3000).optional(),
});

// Attach/confirm the owner's payout address to a listing before settlement.
const attachOwnerSchema = Joi.object({
  ownerAddress: ethAddress.required(),
});

// Review an agent: overall stars + communication/professionalism + a comment.
const reviewSchema = Joi.object({
  agentId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  communication: Joi.number().integer().min(1).max(5).optional(),
  professionalism: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().allow("").max(1000).optional(),
});

module.exports = { registerSchema, loginSchema, createListingSchema, attachOwnerSchema, reviewSchema };
