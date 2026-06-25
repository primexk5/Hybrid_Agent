const { query } = require("../config/db");

async function list({ buyer, seller, agent, state } = {}) {
  let sql = "SELECT * FROM deals";
  const clauses = [];
  const params = [];
  if (buyer) { params.push(buyer.toLowerCase()); clauses.push(`buyer_address = $${params.length}`); }
  if (seller) { params.push(seller.toLowerCase()); clauses.push(`seller_address = $${params.length}`); }
  if (agent) { params.push(agent.toLowerCase()); clauses.push(`agent_address = $${params.length}`); }
  if (state) { params.push(state); clauses.push(`state = $${params.length}`); }
  if (clauses.length) sql += " WHERE " + clauses.join(" AND ");
  sql += " ORDER BY deal_id DESC";
  const { rows } = await query(sql, params);
  return rows;
}

async function getById(id) {
  const { rows } = await query("SELECT * FROM deals WHERE deal_id = $1", [id]);
  return rows[0] || null;
}

async function upsertCreated(d) {
  await query(
    `INSERT INTO deals (deal_id, listing_ref, buyer_address, seller_address, agent_address, price, commission_bps, platform_fee_bps, mandate_id, state, tx_hash, block_number)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'created',$10,$11)
     ON CONFLICT (deal_id) DO UPDATE SET
       listing_ref=EXCLUDED.listing_ref, buyer_address=EXCLUDED.buyer_address,
       seller_address=EXCLUDED.seller_address, agent_address=EXCLUDED.agent_address,
       price=EXCLUDED.price, commission_bps=EXCLUDED.commission_bps,
       platform_fee_bps=EXCLUDED.platform_fee_bps, mandate_id=EXCLUDED.mandate_id,
       tx_hash=EXCLUDED.tx_hash, block_number=EXCLUDED.block_number`,
    [
      d.id, d.listingRef, d.buyer, d.seller, d.agent, d.price,
      d.commissionBps, d.platformFeeBps, d.mandateId, d.txHash, d.blockNumber,
    ]
  );
}

async function setState(id, state, disputeDeadline = null) {
  await query(
    "UPDATE deals SET state = $1, dispute_deadline = COALESCE($2, dispute_deadline) WHERE deal_id = $3",
    [state, disputeDeadline, id]
  );
}

async function listingRefFor(dealId) {
  const { rows } = await query("SELECT listing_ref FROM deals WHERE deal_id = $1", [dealId]);
  return rows.length ? rows[0].listing_ref : null;
}

// Off-chain split preview, mirrors HybridEscrow.quote (base units, 6 decimals).
function quote(price, commissionBps, platformFeeBps) {
  const p = BigInt(price);
  const commission = (p * BigInt(commissionBps)) / 10000n;
  const fee = (p * BigInt(platformFeeBps)) / 10000n;
  const proceeds = p - commission - fee;
  return {
    price: p.toString(),
    commission: commission.toString(),
    platformFee: fee.toString(),
    sellerProceeds: proceeds.toString(),
  };
}

module.exports = { list, getById, upsertCreated, setState, listingRefFor, quote };
