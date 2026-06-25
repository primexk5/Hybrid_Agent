const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const reviewModel = require("../models/reviewModel");
const agentModel = require("../models/agentModel");

// POST /reviews  (auth) — review an agent you've actually interacted with.
const create = asyncHandler(async (req, res) => {
  const { agentId, rating, communication, professionalism, comment } = req.body;
  if (agentId === req.user.id) throw ApiError.badRequest("you cannot review yourself");

  const agent = await agentModel.getById(agentId);
  if (!agent) throw ApiError.notFound("agent not found");

  // Anti-fraud: only people who have chatted with the agent can review them.
  const interacted = await reviewModel.hasInteracted(agentId, req.user.id);
  if (!interacted) {
    throw ApiError.forbidden("you can only review agents you've chatted with on-platform");
  }

  await reviewModel.upsert(agentId, req.user.id, { rating, communication, professionalism, comment });
  res.status(201).json({
    summary: await reviewModel.summary(agentId),
    reviews: await reviewModel.listByAgent(agentId),
  });
});

// GET /reviews?agentId=  — an agent's reviews + summary.
const listForAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.query;
  if (!agentId) throw ApiError.badRequest("agentId is required");
  res.json({
    summary: await reviewModel.summary(agentId),
    reviews: await reviewModel.listByAgent(agentId),
  });
});

// GET /reviews/recent  — recent reviews across the platform (public).
const recent = asyncHandler(async (req, res) => {
  res.json(await reviewModel.recent());
});

// GET /reviews/eligibility?agentId=  (auth) — can I review this agent, and my existing review.
const eligibility = asyncHandler(async (req, res) => {
  const { agentId } = req.query;
  if (!agentId) throw ApiError.badRequest("agentId is required");
  const [canReview, existing] = await Promise.all([
    reviewModel.hasInteracted(agentId, req.user.id),
    reviewModel.getForReviewer(agentId, req.user.id),
  ]);
  res.json({ canReview: canReview && agentId !== req.user.id, existing });
});

module.exports = { create, listForAgent, recent, eligibility };
