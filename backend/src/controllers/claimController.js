const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const listingModel = require("../models/listingModel");

// GET /claim/:listingId — minimal, public-safe context for the owner claim page.
// The owner authenticates with their email (magic link) on the frontend; the
// embedded wallet that opens deterministically maps to `ownerWallet`.
const get = asyncHandler(async (req, res) => {
  const listing = await listingModel.getById(req.params.listingId);
  if (!listing) throw ApiError.notFound("listing not found");
  if (listing.listing_type !== "agent_brokered") {
    throw ApiError.badRequest("this listing has no owner claim");
  }

  const price = BigInt(Math.round(Number(listing.price_usdc) * 1e6));
  const commission = (price * BigInt(listing.commission_bps || 0)) / 10000n;
  const platformFee = (price * 100n) / 10000n; // 1% default
  const payout = price - commission - platformFee;
  const fmt = (v) => (Number(v) / 1e6).toLocaleString(undefined, { maximumFractionDigits: 2 });

  res.json({
    listingId: listing.id,
    title: listing.title,
    image: listing.image,
    assetType: listing.asset_type,
    status: listing.status, // open | pending | sold
    ownerStatus: listing.owner_status,
    ownerWallet: listing.owner_address,
    ownerEmail: listing.owner_email,
    agentName: listing.agent_name,
    totalPriceUsdc: listing.price_usdc,
    payoutUsdc: fmt(payout),
    commissionUsdc: fmt(commission),
    settled: listing.status === "sold",
  });
});

module.exports = { get };
