// Drives a full agent_brokered escrow deal to completion on a testnet, so a real
// USDC payout lands in a wallet — the on-chain side of the claim/withdraw demo.
//
// Flow (mirrors the product's "agent brokers an owner's sale"):
//   owner.createMandate -> agent.acceptMandate -> agent.createDeal
//   -> buyer.approve + fundDeal -> buyer.confirmCompletion
// On completion the escrow atomically pays: agent=commission, platform=fee,
// owner(seller)=remainder. The indexer then records a COMPLETED deal, so
// GET /wallet shows a withdrawable balance for the owner and agent.
//
// Requires MockUSDC (mintable). Uses three deterministic test wallets derived
// from the deployer key so re-runs reuse (and top up) the same accounts instead
// of stranding ETH. Owner/agent/buyer must sign their own steps, so they are
// script-controlled EOAs — not the eventual Privy owner wallet.
//
//   USE: npx hardhat run scripts/seedPayout.js --network sepolia
//   ENV: PRICE_USDC (default 1000)  COMMISSION_BPS (default 500 = 5%)

const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

const MIN_GAS_ETH = ethers.parseEther("0.0008"); // top up below this
const FUND_TO_ETH = ethers.parseEther("0.0016"); // bring wallets up to this

function loadDeployment() {
  const file = path.join(__dirname, "..", "deployments", `${network.name}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`No deployments/${network.name}.json — run deploy first.`);
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Deterministic test wallet for a role, seeded by the deployer address so the
// same accounts (and their funded ETH) are reused across runs.
function roleWallet(role, seed, provider) {
  const pk = ethers.keccak256(ethers.toUtf8Bytes(`hybridagent:seed:${seed}:${role}`));
  return new ethers.Wallet(pk, provider);
}

async function topUp(deployer, wallet, label) {
  const bal = await ethers.provider.getBalance(wallet.address);
  if (bal >= MIN_GAS_ETH) {
    console.log(`  ${label} ${wallet.address} — ${ethers.formatEther(bal)} ETH (ok)`);
    return;
  }
  const amount = FUND_TO_ETH - bal;
  console.log(`  ${label} ${wallet.address} — funding ${ethers.formatEther(amount)} ETH`);
  await (await deployer.sendTransaction({ to: wallet.address, value: amount })).wait();
}

const usdc6 = (n) => ethers.parseUnits(String(n), 6);
const fmt6 = (v) => Number(ethers.formatUnits(v, 6)).toLocaleString();

async function main() {
  const dep = loadDeployment();
  const [deployer] = await ethers.getSigners();
  const provider = ethers.provider;

  const price = usdc6(process.env.PRICE_USDC || 1000);
  const commissionBps = Number(process.env.COMMISSION_BPS || 500);

  console.log(`Network: ${network.name}  chainId ${dep.chainId}`);
  console.log(`Escrow:  ${dep.hybridEscrow}`);
  console.log(`USDC:    ${dep.usdc}`);

  // Test parties (script-controlled).
  const owner = roleWallet("owner", deployer.address, provider); // seller
  const agent = roleWallet("agent", deployer.address, provider);
  const buyer = roleWallet("buyer", deployer.address, provider);

  console.log("\nFunding test wallets with gas:");
  await topUp(deployer, owner, "owner");
  await topUp(deployer, agent, "agent");
  await topUp(deployer, buyer, "buyer");

  // Contract handles.
  const usdc = await ethers.getContractAt("MockUSDC", dep.usdc);
  const mandates = await ethers.getContractAt("MandateRegistry", dep.mandateRegistry);
  const escrow = await ethers.getContractAt("HybridEscrow", dep.hybridEscrow);

  // MockUSDC guard — this script needs a mintable token.
  try {
    await usdc.mint.staticCall(buyer.address, 0n);
  } catch {
    throw new Error(`USDC at ${dep.usdc} is not mintable (not MockUSDC). Redeploy with USE_MOCK_USDC=true.`);
  }

  // 1) Fund the buyer with USDC to pay the full price.
  console.log(`\n1) Minting ${fmt6(price)} USDC to buyer`);
  await (await usdc.mint(buyer.address, price)).wait();

  // 2) Owner authorizes the agent to broker this listing.
  const listingRef = ethers.keccak256(ethers.toUtf8Bytes(`demo-listing:${Date.now()}`));
  const expiry = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
  const mandateId = await mandates.nextMandateId(); // id assigned next
  console.log(`2) owner.createMandate (commission ${commissionBps} bps) -> mandate #${mandateId}`);
  await (await mandates.connect(owner).createMandate(agent.address, listingRef, commissionBps, expiry)).wait();

  // 3) Agent accepts the mandate.
  console.log(`3) agent.acceptMandate(#${mandateId})`);
  await (await mandates.connect(agent).acceptMandate(mandateId)).wait();

  // 4) Agent opens the escrow deal (seller = owner).
  const dealId = await escrow.nextDealId();
  console.log(`4) agent.createDeal -> deal #${dealId}`);
  await (
    await escrow.connect(agent).createDeal(buyer.address, owner.address, agent.address, price, listingRef, mandateId)
  ).wait();

  // 5) Buyer approves + funds the full price.
  console.log(`5) buyer.approve + fundDeal(#${dealId})`);
  await (await usdc.connect(buyer).approve(dep.hybridEscrow, price)).wait();
  await (await escrow.connect(buyer).fundDeal(dealId)).wait();

  // 6) Buyer confirms receipt -> escrow settles the splits atomically.
  console.log(`6) buyer.confirmCompletion(#${dealId})`);
  await (await escrow.connect(buyer).confirmCompletion(dealId)).wait();

  // Results.
  const [ownerBal, agentBal, feeBal] = await Promise.all([
    usdc.balanceOf(owner.address),
    usdc.balanceOf(agent.address),
    usdc.balanceOf(dep.feeRecipient),
  ]);
  const [commission, fee, proceeds] = await escrow.quote(price, commissionBps);

  console.log("\n── Payout complete ──");
  console.log(`Deal #${dealId}  listingRef ${listingRef}`);
  console.log(`Price:        ${fmt6(price)} USDC`);
  console.log(`Owner (seller) ${owner.address}`);
  console.log(`  proceeds:   ${fmt6(proceeds)} USDC   (balance now ${fmt6(ownerBal)})`);
  console.log(`Agent          ${agent.address}`);
  console.log(`  commission: ${fmt6(commission)} USDC   (balance now ${fmt6(agentBal)})`);
  console.log(`Platform fee:  ${fmt6(fee)} USDC   (-> ${dep.feeRecipient}, balance ${fmt6(feeBal)})`);

  console.log("\nThe indexer will record this completed deal; GET /wallet for the");
  console.log("owner or agent address above will then show a withdrawable balance.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
