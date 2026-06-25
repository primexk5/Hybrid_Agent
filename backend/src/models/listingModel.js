const { query } = require("../config/db");

// Join the creating agent's public info so the UI can show certified-agent
// details (name, phone, avatar, verification) on listings.
const SELECT = `
  SELECT l.*,
         u.full_name   AS agent_name,
         u.user_name   AS agent_username,
         u.phone_number AS agent_phone,
         u.avatar      AS agent_avatar,
         u.kyc_status  AS agent_kyc,
         (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.agent_id = u.id) AS agent_rating,
         (SELECT COUNT(*) FROM reviews r WHERE r.agent_id = u.id) AS agent_review_count
  FROM listings l
  LEFT JOIN users u ON u.id = l.created_by
`;

async function list({ assetType, status } = {}) {
  const clauses = [];
  const params = [];
  if (assetType) { params.push(assetType); clauses.push(`l.asset_type = $${params.length}`); }
  if (status) { params.push(status); clauses.push(`l.status = $${params.length}`); }
  const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
  const { rows } = await query(`${SELECT}${where} ORDER BY l.created_at DESC`, params);
  return rows;
}

async function listByCreator(userId) {
  const { rows } = await query(`${SELECT} WHERE l.created_by = $1 ORDER BY l.created_at DESC`, [userId]);
  return rows;
}

async function getById(id) {
  const { rows } = await query(`${SELECT} WHERE l.id = $1`, [id]);
  return rows[0] || null;
}

async function getByRef(listingRef) {
  const { rows } = await query(`${SELECT} WHERE l.listing_ref = $1`, [listingRef]);
  return rows[0] || null;
}

async function create(listing) {
  const { rows } = await query(
    `INSERT INTO listings
      (listing_ref, asset_type, listing_type, title, description, image, price_usdc,
       owner_address, owner_name, owner_email, owner_contact, owner_status, agent_address, commission_bps, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'open',$15)
     RETURNING id`,
    [
      listing.listingRef,
      listing.assetType,
      listing.listingType,
      listing.title,
      listing.description || null,
      listing.image || null,
      String(listing.priceUsdc),
      listing.ownerAddress || null,
      listing.ownerName || null,
      listing.ownerEmail || null,
      listing.ownerContact || null,
      listing.ownerStatus || "pending",
      listing.agentAddress || null,
      listing.commissionBps || 0,
      listing.createdBy || null,
    ]
  );
  return getById(rows[0].id);
}

// Just-in-time: attach the off-platform owner's payout address before settlement.
async function attachOwner(id, ownerAddress) {
  const { rows } = await query(
    `UPDATE listings SET owner_address = $1, owner_status = 'confirmed' WHERE id = $2 RETURNING id`,
    [ownerAddress.toLowerCase(), id]
  );
  return rows.length ? getById(id) : null;
}

module.exports = { list, listByCreator, getById, getByRef, create, attachOwner };
