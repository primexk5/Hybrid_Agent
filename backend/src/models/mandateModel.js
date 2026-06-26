const db = require("../config/filebaseDB");

const RECORDS = "db/mandates/records/";

async function list({ owner, agent, status } = {}) {
  const all = await db.getAll(RECORDS);
  return all
    .filter((m) => {
      if (owner && m.owner_address !== owner.toLowerCase()) return false;
      if (agent && m.agent_address !== agent.toLowerCase()) return false;
      if (status && m.status !== status) return false;
      return true;
    })
    .sort((a, b) => b.mandate_id - a.mandate_id);
}

async function getById(id) {
  return db.get(`${RECORDS}${id}.json`);
}

async function upsertCreated(m) {
  const existing = (await db.get(`${RECORDS}${m.id}.json`)) || {};
  const mandate = {
    ...existing,
    mandate_id: m.id,
    owner_address: m.owner,
    agent_address: m.agent,
    listing_ref: m.listingRef,
    commission_bps: m.commissionBps,
    expiry: m.expiry,
    status: "pending",
    tx_hash: m.txHash,
    block_number: m.blockNumber,
  };
  await db.put(`${RECORDS}${m.id}.json`, mandate);
}

async function setStatus(id, status) {
  const mandate = await db.get(`${RECORDS}${id}.json`);
  if (!mandate) return;
  mandate.status = status;
  await db.put(`${RECORDS}${id}.json`, mandate);
}

async function getByListingRef(listingRef) {
  const all = await db.getAll(RECORDS);
  const accepted = all
    .filter((m) => m.listing_ref === listingRef && m.status === "accepted")
    .sort((a, b) => b.mandate_id - a.mandate_id);
  return accepted[0] || null;
}

module.exports = { list, getById, upsertCreated, setStatus, getByListingRef };
