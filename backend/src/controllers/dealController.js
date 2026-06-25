const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const dealModel = require("../models/dealModel");

// GET /deals/quote?price=&commissionBps=&platformFeeBps=
const quote = asyncHandler(async (req, res) => {
  const price = BigInt(req.query.price || 0);
  if (price <= 0n) throw ApiError.badRequest("price must be > 0");
  res.json(dealModel.quote(price, req.query.commissionBps || 0, req.query.platformFeeBps || 100));
});

// GET /deals
const list = asyncHandler(async (req, res) => {
  res.json(await dealModel.list({
    buyer: req.query.buyer,
    seller: req.query.seller,
    agent: req.query.agent,
    state: req.query.state,
  }));
});

// GET /deals/:id
const getOne = asyncHandler(async (req, res) => {
  const deal = await dealModel.getById(req.params.id);
  if (!deal) throw ApiError.notFound("deal not found");
  res.json(deal);
});

module.exports = { quote, list, getOne };
