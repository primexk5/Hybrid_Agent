const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const mandateModel = require("../models/mandateModel");

// GET /mandates
const list = asyncHandler(async (req, res) => {
  res.json(await mandateModel.list({
    owner: req.query.owner,
    agent: req.query.agent,
    status: req.query.status,
  }));
});

// GET /mandates/:id
const getOne = asyncHandler(async (req, res) => {
  const mandate = await mandateModel.getById(req.params.id);
  if (!mandate) throw ApiError.notFound("mandate not found");
  res.json(mandate);
});

module.exports = { list, getOne };
