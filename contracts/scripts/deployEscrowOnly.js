// Redeploy only HybridEscrow, reusing existing USDC + MandateRegistry.
// Usage: USDC_ADDRESS=0x... MANDATE_REGISTRY_ADDRESS=0x... npx hardhat run scripts/deployEscrowOnly.js --network baseSepolia
const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const usdcAddress = process.env.USDC_ADDRESS;
  const mandatesAddress = process.env.MANDATE_REGISTRY_ADDRESS;
  if (!usdcAddress || !mandatesAddress) {
    throw new Error("Set USDC_ADDRESS and MANDATE_REGISTRY_ADDRESS in env");
  }

  const [deployer] = await ethers.getSigners();
  console.log(`Network:  ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);

  const platformFeeBps = Number(process.env.PLATFORM_FEE_BPS || 100);
  const feeRecipient = process.env.FEE_RECIPIENT || deployer.address;
  const arbiter = process.env.ARBITER || deployer.address;

  const HybridEscrow = await ethers.getContractFactory("HybridEscrow");
  const escrow = await HybridEscrow.deploy(usdcAddress, mandatesAddress, feeRecipient, platformFeeBps, arbiter);
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log(`\nHybridEscrow deployed: ${escrowAddress}`);

  const chainId = Number((await ethers.provider.getNetwork()).chainId);
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const existing = JSON.parse(fs.readFileSync(path.join(deploymentsDir, `${network.name}.json`), "utf8"));
  fs.writeFileSync(
    path.join(deploymentsDir, `${network.name}.json`),
    JSON.stringify({ ...existing, hybridEscrow: escrowAddress, deployedAt: new Date().toISOString() }, null, 2)
  );

  console.log("\n── Paste into backend/.env ──");
  console.log(`HYBRID_ESCROW_ADDRESS=${escrowAddress}`);
  console.log(`\nExplorer: https://sepolia.basescan.org/address/${escrowAddress}`);
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
