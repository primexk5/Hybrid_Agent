const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const agentModel = require("../models/agentModel");
const reviewModel = require("../models/reviewModel");

// GET /agents  — ranked agent leaderboard (public).
const leaderboard = asyncHandler(async (req, res) => {
  res.json(await agentModel.leaderboard());
});

// GET /agents/:id  — agent profile + reviews (public).
const getOne = asyncHandler(async (req, res) => {
  const agent = await agentModel.getById(req.params.id);
  if (!agent) throw ApiError.notFound("agent not found");
  res.json({ agent, reviews: await reviewModel.listByAgent(req.params.id) });
});

module.exports = { leaderboard, getOne };
