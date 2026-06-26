// Seeds a demo claim: pre-generates the owner's Privy embedded wallet from an
// email and inserts a settled agent_brokered listing pointing at it. Prints the
// claim URL + the owner wallet address (fund it with the contracts faucet, then
// sign in on the claim page with DEMO_OWNER_EMAIL to withdraw).
//
//   DEMO_OWNER_EMAIL=you@example.com node scripts/seedClaimDemo.js

require("dotenv").config();
const crypto = require("crypto");
const { ethers } = require("ethers");
const { query } = require("../src/config/db");
const config = require("../src/config");
const walletProvider = require("../src/services/walletProvider");

async function main() {
  const email = process.env.DEMO_OWNER_EMAIL || "claudecode7f@gmail.com";
  const price = process.env.DEMO_PRICE_USDC || "1000";
  const commissionBps = Number(process.env.DEMO_COMMISSION_BPS || 500);

  const { address, provider } = await walletProvider.preGenerate(email);
  console.log(`Owner email:  ${email}`);
  console.log(`Owner wallet: ${address}  (${provider})`);

  const id = crypto.randomUUID();
  const listingRef = "0x" + crypto.randomBytes(32).toString("hex");

  await query(
    `INSERT INTO listings
      (id, listing_ref, asset_type, listing_type, title, description, image,
       price_usdc, owner_address, agent_address, commission_bps, status,
       owner_name, owner_email, owner_status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [
      id,
      listingRef,
      "property",
      "agent_brokered",
      "Demo Villa — Privy Claim Test",
      "A seeded listing to demo the owner claim + withdraw flow.",
      null,
      price,
      address,
      null,
      commissionBps,
      "sold", // settled -> claim page shows funds available
      "Demo Owner",
      email,
      "invited",
    ]
  );

  const base = config.appBaseUrl || "http://localhost:3000";
  console.log(`\nListing id:  ${id}`);
  console.log(`Claim URL:   ${base}/claim?listingId=${id}`);
  console.log(`\nNext: fund the owner wallet with test USDC + gas, e.g.`);
  console.log(`  (in contracts/)  TO=${address} AMOUNT_USDC=940 npm run faucet:sepolia`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
