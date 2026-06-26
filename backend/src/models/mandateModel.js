const { query } = require("../config/db");

async function list({ owner, agent, status } = {}) {
  let sql = "SELECT * FROM mandates";
  const clauses = [];
  const params = [];
  if (owner) { params.push(owner.toLowerCase()); clauses.push(`owner_address = $${params.length}`); }
  if (agent) { params.push(agent.toLowerCase()); clauses.push(`agent_address = $${params.length}`); }
  if (status) { params.push(status); clauses.push(`status = $${params.length}`); }
  if (clauses.length) sql += " WHERE " + clauses.join(" AND ");
  sql += " ORDER BY mandate_id DESC";
  const { rows } = await query(sql, params);
  return rows;
}

async function getById(id) {
  const { rows } = await query("SELECT * FROM mandates WHERE mandate_id = $1", [id]);
  return rows[0] || null;
}

async function upsertCreated(m) {
  await query(
    `INSERT INTO mandates (mandate_id, owner_address, agent_address, listing_ref, commission_bps, expiry, status, tx_hash, block_number)
     VALUES ($1,$2,$3,$4,$5,$6,'pending',$7,$8)
     ON CONFLICT (mandate_id) DO UPDATE SET
       owner_address=EXCLUDED.owner_address, agent_address=EXCLUDED.agent_address,
       listing_ref=EXCLUDED.listing_ref, commission_bps=EXCLUDED.commission_bps,
       expiry=EXCLUDED.expiry, tx_hash=EXCLUDED.tx_hash, block_number=EXCLUDED.block_number`,
    [m.id, m.owner, m.agent, m.listingRef, m.commissionBps, m.expiry, m.txHash, m.blockNumber]
  );
}

async function setStatus(id, status) {
  await query("UPDATE mandates SET status = $1 WHERE mandate_id = $2", [status, id]);
}

async function getByListingRef(listingRef) {
  const { rows } = await query(
    "SELECT * FROM mandates WHERE listing_ref = $1 AND status = 'accepted' ORDER BY mandate_id DESC LIMIT 1",
    [listingRef]
  );
  return rows[0] || null;
}

module.exports = { list, getById, upsertCreated, setStatus, getByListingRef };
