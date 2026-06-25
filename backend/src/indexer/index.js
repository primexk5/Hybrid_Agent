const config = require("../config");
const { query, getMeta, setMeta } = require("../config/db");
const { provider, mandateRegistry, hybridEscrow } = require("../config/chain");
const mandateModel = require("../models/mandateModel");
const dealModel = require("../models/dealModel");
const listingModel = require("../models/listingModel");
const mailer = require("../services/mailer");

const LAST_BLOCK_KEY = "indexer:lastBlock";
const MAX_RANGE = 2000; // RPCs often cap getLogs ranges; page through.
const ZERO = "0x0000000000000000000000000000000000000000";

async function markListingForDeal(dealId, status) {
  const ref = await dealModel.listingRefFor(dealId);
  if (ref) await query("UPDATE listings SET status = $1 WHERE listing_ref = $2", [status, ref]);
}

// When the escrow releases funds, email the owner that they can claim.
async function notifyOwnerClaimReady(dealId) {
  try {
    const ref = await dealModel.listingRefFor(dealId);
    if (!ref) return;
    const listing = await listingModel.getByRef(ref);
    if (listing?.owner_email) {
      await mailer.sendClaimReady({ to: listing.owner_email, title: listing.title, listingId: listing.id });
    }
  } catch (err) {
    console.error("[indexer] claim-ready email failed:", err.message);
  }
}

async function handleMandateEvent(name, args, log) {
  if (name === "MandateCreated") {
    await mandateModel.upsertCreated({
      id: Number(args.id),
      owner: args.owner.toLowerCase(),
      agent: args.agent.toLowerCase(),
      listingRef: args.listingRef,
      commissionBps: Number(args.commissionBps),
      expiry: Number(args.expiry),
      txHash: log.transactionHash,
      blockNumber: log.blockNumber,
    });
  } else if (name === "MandateAccepted") {
    await mandateModel.setStatus(Number(args.id), "accepted");
  } else if (name === "MandateRevoked") {
    await mandateModel.setStatus(Number(args.id), "revoked");
  }
}

async function handleEscrowEvent(name, args, log) {
  if (name === "DealCreated") {
    await dealModel.upsertCreated({
      id: Number(args.id),
      listingRef: args.listingRef,
      buyer: args.buyer.toLowerCase(),
      seller: args.seller.toLowerCase(),
      agent: args.agent === ZERO ? null : args.agent.toLowerCase(),
      price: args.price.toString(),
      commissionBps: Number(args.commissionBps),
      platformFeeBps: Number(args.platformFeeBps),
      mandateId: Number(args.mandateId),
      txHash: log.transactionHash,
      blockNumber: log.blockNumber,
    });
  } else if (name === "DealFunded") {
    await dealModel.setState(Number(args.id), "funded", Number(args.disputeDeadline));
    await markListingForDeal(Number(args.id), "pending");
  } else if (name === "DealCompleted") {
    await dealModel.setState(Number(args.id), "completed");
    await markListingForDeal(Number(args.id), "sold");
    await notifyOwnerClaimReady(Number(args.id));
  } else if (name === "DealDisputed") {
    await dealModel.setState(Number(args.id), "disputed");
  } else if (name === "DealRefunded") {
    await dealModel.setState(Number(args.id), "refunded");
    await markListingForDeal(Number(args.id), "open");
  } else if (name === "DealCancelled") {
    await dealModel.setState(Number(args.id), "cancelled");
    await markListingForDeal(Number(args.id), "open");
  }
}

async function syncRange(fromBlock, toBlock) {
  const mandateLogs = await mandateRegistry.queryFilter("*", fromBlock, toBlock);
  const escrowLogs = await hybridEscrow.queryFilter("*", fromBlock, toBlock);

  for (const log of mandateLogs) {
    const parsed = mandateRegistry.interface.parseLog(log);
    if (parsed) await handleMandateEvent(parsed.name, parsed.args, log);
  }
  for (const log of escrowLogs) {
    const parsed = hybridEscrow.interface.parseLog(log);
    if (parsed) await handleEscrowEvent(parsed.name, parsed.args, log);
  }
}

async function tick() {
  const latest = await provider.getBlockNumber();
  let from = Number(await getMeta(LAST_BLOCK_KEY, config.startBlock - 1)) + 1;
  if (from > latest) return;

  while (from <= latest) {
    const to = Math.min(from + MAX_RANGE - 1, latest);
    await syncRange(from, to);
    await setMeta(LAST_BLOCK_KEY, to);
    from = to + 1;
  }
}

function start() {
  if (!config.chainConfigured) {
    console.warn("[indexer] chain not configured — skipping. Set contract addresses in .env to enable.");
    return;
  }

  let running = false;
  const loop = async () => {
    if (running) return;
    running = true;
    try {
      await tick();
    } catch (err) {
      console.error("[indexer] error:", err.message);
    } finally {
      running = false;
    }
  };

  loop();
  setInterval(loop, config.pollIntervalMs);
  console.log(`[indexer] polling every ${config.pollIntervalMs}ms from block ${config.startBlock}`);
}

module.exports = { start };
