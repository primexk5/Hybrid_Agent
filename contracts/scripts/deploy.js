const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

// Canonical Circle USDC per network. On local chains we deploy MockUSDC instead.
const KNOWN_USDC = {
  sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  baseSepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  arbitrumSepolia: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
};
const LOCAL_NETWORKS = ["hardhat", "localhost"];

const EXPLORER = {
  sepolia: "https://sepolia.etherscan.io/address/",
  baseSepolia: "https://sepolia.basescan.org/address/",
  base: "https://basescan.org/address/",
  arbitrumSepolia: "https://sepolia.arbiscan.io/address/",
};

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Network:  ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);

  const platformFeeBps = Number(process.env.PLATFORM_FEE_BPS || 100); // 1%
  const feeRecipient = process.env.FEE_RECIPIENT || deployer.address;
  const arbiter = process.env.ARBITER || deployer.address;

  // Resolve USDC. USE_MOCK_USDC forces a fresh mintable MockUSDC even on a public
  // testnet (so demos can fund buyers); otherwise: explicit env > known per-network
  // address > MockUSDC (local only).
  const useMock = String(process.env.USE_MOCK_USDC || "").toLowerCase() === "true";
  let usdcAddress = useMock ? "" : process.env.USDC_ADDRESS || KNOWN_USDC[network.name];
  if (!usdcAddress) {
    if (!useMock && !LOCAL_NETWORKS.includes(network.name)) {
      throw new Error(
        `No USDC address known for network "${network.name}". Set USDC_ADDRESS in contracts/.env, or USE_MOCK_USDC=true to deploy a mintable MockUSDC.`
      );
    }
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const mock = await MockUSDC.deploy();
    await mock.waitForDeployment();
    usdcAddress = await mock.getAddress();
    console.log(`MockUSDC deployed: ${usdcAddress}`);
  } else {
    console.log(`USDC:     ${usdcAddress}`);
  }

  const MandateRegistry = await ethers.getContractFactory("MandateRegistry");
  const mandates = await MandateRegistry.deploy();
  await mandates.waitForDeployment();
  const mandatesAddress = await mandates.getAddress();
  console.log(`MandateRegistry deployed: ${mandatesAddress}`);

  const HybridEscrow = await ethers.getContractFactory("HybridEscrow");
  const escrow = await HybridEscrow.deploy(usdcAddress, mandatesAddress, feeRecipient, platformFeeBps, arbiter);
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log(`HybridEscrow deployed:    ${escrowAddress}`);

  const chainId = Number((await ethers.provider.getNetwork()).chainId);
  const out = {
    network: network.name,
    chainId,
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
  fs.writeFileSync(path.join(deploymentsDir, `${network.name}.json`), JSON.stringify(out, null, 2));
  console.log(`\nSaved deployments/${network.name}.json`);

  console.log("\n── Paste into backend/.env ──");
  console.log(`CHAIN_ID=${chainId}`);
  console.log(`USDC_ADDRESS=${usdcAddress}`);
  console.log(`MANDATE_REGISTRY_ADDRESS=${mandatesAddress}`);
  console.log(`HYBRID_ESCROW_ADDRESS=${escrowAddress}`);

  if (EXPLORER[network.name]) {
    console.log(`\nExplorer: ${EXPLORER[network.name]}${escrowAddress}`);
    console.log(
      `Verify:   npx hardhat verify --network ${network.name} ${escrowAddress} ${usdcAddress} ${mandatesAddress} ${feeRecipient} ${platformFeeBps} ${arbiter}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
