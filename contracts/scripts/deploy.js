const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Network: ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);

  const platformFeeBps = Number(process.env.PLATFORM_FEE_BPS || 100); // 1%
  const feeRecipient = process.env.FEE_RECIPIENT || deployer.address;
  const arbiter = process.env.ARBITER || deployer.address;

  // USDC: use the configured address, or deploy a mock locally.
  let usdcAddress = process.env.USDC_ADDRESS;
  if (!usdcAddress) {
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const mock = await MockUSDC.deploy();
    await mock.waitForDeployment();
    usdcAddress = await mock.getAddress();
    console.log(`MockUSDC deployed: ${usdcAddress}`);
  } else {
    console.log(`Using USDC: ${usdcAddress}`);
  }

  const MandateRegistry = await ethers.getContractFactory("MandateRegistry");
  const mandates = await MandateRegistry.deploy();
  await mandates.waitForDeployment();
  const mandatesAddress = await mandates.getAddress();
  console.log(`MandateRegistry deployed: ${mandatesAddress}`);

  const HybridEscrow = await ethers.getContractFactory("HybridEscrow");
  const escrow = await HybridEscrow.deploy(
    usdcAddress,
    mandatesAddress,
    feeRecipient,
    platformFeeBps,
    arbiter
  );
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log(`HybridEscrow deployed: ${escrowAddress}`);

  const out = {
    network: network.name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    usdc: usdcAddress,
    mandateRegistry: mandatesAddress,
    hybridEscrow: escrowAddress,
    feeRecipient,
    arbiter,
    platformFeeBps,
    deployedAt: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(deploymentsDir, { recursive: true });
  fs.writeFileSync(
    path.join(deploymentsDir, `${network.name}.json`),
    JSON.stringify(out, null, 2)
  );

  console.log("\nDeployment summary written to deployments/" + network.name + ".json");
  console.log("\nBackend .env values:");
  console.log(`CHAIN_ID=${out.chainId}`);
  console.log(`USDC_ADDRESS=${usdcAddress}`);
  console.log(`MANDATE_REGISTRY_ADDRESS=${mandatesAddress}`);
  console.log(`HYBRID_ESCROW_ADDRESS=${escrowAddress}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
