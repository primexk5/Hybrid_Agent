const { query } = require("../config/db");

async function getByListing(listingId) {
  const { rows } = await query(
    "SELECT * FROM purchase_requests WHERE listing_id = $1 ORDER BY created_at DESC",
    [listingId]
  );
  return rows;
}

async function getByListingAndBuyer(listingId, buyerId) {
  const { rows } = await query(
    "SELECT * FROM purchase_requests WHERE listing_id = $1 AND buyer_id = $2",
    [listingId, buyerId]
  );
  return rows[0] || null;
}

async function create(listingId, buyerId, buyerAddress) {
  const { rows } = await query(
    `INSERT INTO purchase_requests (listing_id, buyer_id, buyer_address)
     VALUES ($1, $2, $3)
     ON CONFLICT (listing_id, buyer_id) DO UPDATE SET status = 'requested'
     RETURNING *`,
    [listingId, buyerId, buyerAddress.toLowerCase()]
  );
  return rows[0];
}

async function recordDeal(listingId, buyerId, dealId) {
  const { rows } = await query(
    `UPDATE purchase_requests
     SET deal_id = $1, status = 'deal_created'
     WHERE listing_id = $2 AND buyer_id = $3
     RETURNING *`,
    [dealId, listingId, buyerId]
  );
  return rows[0] || null;
}

async function markFunded(listingId, buyerAddress) {
  await query(
    `UPDATE purchase_requests SET status = 'funded'
     WHERE listing_id = $1 AND buyer_address = $2`,
    [listingId, buyerAddress.toLowerCase()]
  );
}

async function getByBuyer(buyerId) {
  const { rows } = await query(
    `SELECT pr.*, l.title AS listing_title, l.image AS listing_image, l.price_usdc
     FROM purchase_requests pr
     JOIN listings l ON l.id = pr.listing_id
     WHERE pr.buyer_id = $1 AND pr.status NOT IN ('funded', 'cancelled')
     ORDER BY pr.updated_at DESC`,
    [buyerId]
  );
  return rows;
}

module.exports = { getByListing, getByListingAndBuyer, create, recordDeal, markFunded, getByBuyer };
