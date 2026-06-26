const db = require("../config/filebaseDB");

const RECORDS = "db/deals/records/";

async function list({ buyer, seller, agent, state } = {}) {
  const all = await db.getAll(RECORDS);
  return all
    .filter((d) => {
      if (buyer && d.buyer_address !== buyer.toLowerCase()) return false;
      if (seller && d.seller_address !== seller.toLowerCase()) return false;
      if (agent && d.agent_address !== agent.toLowerCase()) return false;
      if (state && d.state !== state) return false;
      return true;
    })
    .sort((a, b) => b.deal_id - a.deal_id);
}

async function getById(id) {
  return db.get(`${RECORDS}${id}.json`);
}

async function upsertCreated(d) {
  const existing = (await db.get(`${RECORDS}${d.id}.json`)) || {};
  const deal = {
    ...existing,
    deal_id: d.id,
    listing_ref: d.listingRef,
    buyer_address: d.buyer,
    seller_address: d.seller,
    agent_address: d.agent,
    price: d.price,
    commission_bps: d.commissionBps,
    platform_fee_bps: d.platformFeeBps,
    mandate_id: d.mandateId,
    state: "created",
    tx_hash: d.txHash,
    block_number: d.blockNumber,
    dispute_deadline: existing.dispute_deadline || null,
  };
  await db.put(`${RECORDS}${d.id}.json`, deal);
}

async function setState(id, state, disputeDeadline = null) {
  const deal = await db.get(`${RECORDS}${id}.json`);
  if (!deal) return;
  deal.state = state;
  if (disputeDeadline) deal.dispute_deadline = disputeDeadline;
  await db.put(`${RECORDS}${id}.json`, deal);
}

async function listingRefFor(dealId) {
  const deal = await db.get(`${RECORDS}${dealId}.json`);
  return deal?.listing_ref || null;
}

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
