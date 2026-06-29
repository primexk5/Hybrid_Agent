const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const listingModel = require("../models/listingModel");
const purchaseModel = require("../models/purchaseModel");

// POST /listings/:id/purchase  (buyer auth required)
const request = asyncHandler(async (req, res) => {
  const listing = await listingModel.getById(req.params.id);
  if (!listing) throw ApiError.notFound("listing not found");
  if (listing.status !== "open") throw ApiError.badRequest("listing is not open");
  if (listing.created_by === req.user.id) throw ApiError.badRequest("cannot buy your own listing");
  if (!req.user.wallet_address) throw ApiError.badRequest("wallet not set up");

  const pr = await purchaseModel.create(listing.id, req.user.id, req.user.wallet_address);

  // Notify the listing agent in real-time so they see it in the dashboard.
  const io = req.app.get("io");
  if (io) {
    io.to(`user:${listing.created_by}`).emit("purchase:request", {
      listingId: listing.id,
      listingTitle: listing.title,
      buyerName: req.user.full_name,
    });
  }

  res.json(pr);
});

// GET /listings/:id/purchase  (auth required — buyer gets their own; agent gets all)
const get = asyncHandler(async (req, res) => {
  const listing = await listingModel.getById(req.params.id);
  if (!listing) throw ApiError.notFound("listing not found");

  if (listing.created_by === req.user.id) {
    const rows = await purchaseModel.getByListing(listing.id);
    return res.json(rows);
  }

  const pr = await purchaseModel.getByListingAndBuyer(listing.id, req.user.id);
  res.json(pr || null);
});

// PATCH /listings/:id/purchase/approve  (agent auth required)
// Agent marks the purchase request as approved so buyer can proceed to fund escrow.
const approve = asyncHandler(async (req, res) => {
  const listing = await listingModel.getById(req.params.id);
  if (!listing) throw ApiError.notFound("listing not found");
  if (listing.created_by !== req.user.id) throw ApiError.forbidden("not your listing");

  const { buyerId } = req.body || {};
  if (!buyerId) throw ApiError.badRequest("buyerId required");

  const pr = await purchaseModel.approve(listing.id, buyerId);
  if (!pr) throw ApiError.notFound("purchase request not found");
  res.json(pr);
});

// PATCH /listings/:id/purchase  (agent auth required)
const recordDeal = asyncHandler(async (req, res) => {
  const listing = await listingModel.getById(req.params.id);
  if (!listing) throw ApiError.notFound("listing not found");
  if (listing.created_by !== req.user.id) throw ApiError.forbidden("not your listing");

  const { buyerId, dealId } = req.body || {};
  if (!buyerId || !dealId) throw ApiError.badRequest("buyerId and dealId required");

  const pr = await purchaseModel.recordDeal(listing.id, buyerId, Number(dealId));
  if (!pr) throw ApiError.notFound("purchase request not found");
  res.json(pr);
});

// GET /listings/purchase-requests  (buyer — caller's own active requests)
const getMine = asyncHandler(async (req, res) => {
  const rows = await purchaseModel.getByBuyer(req.user.id);
  res.json(rows);
});

// GET /listings/purchase-requests/incoming  (agent — all requests across the agent's listings)
const getIncoming = asyncHandler(async (req, res) => {
  const rows = await purchaseModel.getIncomingForAgent(req.user.id);
  res.json(rows);
});

module.exports = { request, get, approve, recordDeal, getMine, getIncoming };
