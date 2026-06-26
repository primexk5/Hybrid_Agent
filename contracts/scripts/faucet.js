// Mints test USDC (MockUSDC) to any address — e.g. an embedded Privy wallet — so
// the client-signed withdraw flow has real tokens to move on a testnet.
//
//   USE: TO=0xYourWallet AMOUNT_USDC=500 npx hardhat run scripts/faucet.js --network sepolia
//        (AMOUNT_USDC defaults to 1000; TO defaults to the deployer)

const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const file = path.join(__dirname, "..", "deployments", `${network.name}.json`);
  if (!fs.existsSync(file)) throw new Error(`No deployments/${network.name}.json — deploy first.`);
  const dep = JSON.parse(fs.readFileSync(file, "utf8"));

  const [deployer] = await ethers.getSigners();
  const to = process.env.TO || deployer.address;
  if (!ethers.isAddress(to)) throw new Error(`TO is not a valid address: ${to}`);
  const amount = ethers.parseUnits(String(process.env.AMOUNT_USDC || 1000), 6);

  const usdc = await ethers.getContractAt("MockUSDC", dep.usdc);
  try {
    await usdc.mint.staticCall(to, 0n);
  } catch {
    throw new Error(`USDC at ${dep.usdc} is not mintable (not MockUSDC). Redeploy with USE_MOCK_USDC=true.`);
  }

  console.log(`Minting ${ethers.formatUnits(amount, 6)} USDC to ${to}`);
  await (await usdc.mint(to, amount)).wait();
  const bal = await usdc.balanceOf(to);
  console.log(`Done. Balance: ${ethers.formatUnits(bal, 6)} USDC  (token ${dep.usdc})`);

  // Embedded wallets need a little native ETH to pay gas for the withdraw tx.
  // Send some if the wallet is short (skipped for the deployer itself).
  const ethToSend = ethers.parseEther(String(process.env.GAS_ETH || 0.003));
  if (to.toLowerCase() !== deployer.address.toLowerCase() && ethToSend > 0n) {
    const have = await ethers.provider.getBalance(to);
    if (have < ethToSend) {
      const top = ethToSend - have;
      console.log(`Sending ${ethers.formatEther(top)} ETH for gas to ${to}`);
      await (await deployer.sendTransaction({ to, value: top })).wait();
      console.log(`Gas balance: ${ethers.formatEther(await ethers.provider.getBalance(to))} ETH`);
    } else {
      console.log(`Gas ok: ${ethers.formatEther(have)} ETH`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
