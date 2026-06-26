const { ethers } = require("ethers");
const { PrivyClient } = require("@privy-io/server-auth");
const config = require("../config");

// Deterministic email -> address mapping for dev/scaffold (no Privy keys). The
// SAME email always yields the SAME address, mirroring how a pre-generated
// embedded wallet behaves — but this address has NO signing key, so it can only
// be used as a placeholder. Configure Privy for real, user-controlled wallets.
function devAddressForEmail(email) {
  const seed = `hybridagent:wallet:${String(email).toLowerCase().trim()}`;
  const hash = ethers.keccak256(ethers.toUtf8Bytes(seed));
  return ethers.getAddress("0x" + hash.slice(-40));
}

let privy = null;
function client() {
  if (!config.privy.configured) return null;
  if (!privy) privy = new PrivyClient(config.privy.appId, config.privy.appSecret);
  return privy;
}

// Pull the user's embedded (privy-managed) Ethereum wallet address.
function embeddedEthAddress(user) {
  if (!user) return null;
  const accounts = user.linkedAccounts || [];
  const embedded = accounts.find(
    (a) => a.type === "wallet" && a.chainType === "ethereum" && a.walletClientType === "privy"
  );
  if (embedded?.address) return embedded.address;
  // Fall back to the user's most-recently-linked wallet, then any wallet.
  if (user.wallet?.chainType === "ethereum" && user.wallet.address) return user.wallet.address;
  const anyWallet = accounts.find((a) => a.type === "wallet" && a.address);
  return anyWallet?.address || null;
}

async function getByEmail(p, email) {
  try {
    return await p.getUserByEmail(email);
  } catch {
    return null; // not found
  }
}

// Pre-generate (or fetch) the owner's embedded smart-wallet address from their
// email, WITHOUT a live login session. When the owner later logs in with the
// same email magic-link via Privy, Privy opens this exact address — which is the
// address the escrow pays out to.
async function preGenerate(email) {
  const p = client();
  if (!p) {
    return { address: devAddressForEmail(email), provider: "dev" };
  }

  // Reuse the wallet if this email already has a Privy user.
  const existing = await getByEmail(p, email);
  if (existing) {
    let address = embeddedEthAddress(existing);
    if (!address) {
      const updated = await p.createWallets({ userId: existing.id, createEthereumWallet: true });
      address = embeddedEthAddress(updated);
    }
    return { address: ethers.getAddress(address), provider: "privy" };
  }

  // Otherwise create the user + embedded wallet from their email.
  const user = await p.importUser({
    linkedAccounts: [{ type: "email", address: email }],
    createEthereumWallet: true,
  });
  const address = embeddedEthAddress(user);
  if (!address) throw new Error("Privy did not return an embedded wallet address");
  return { address: ethers.getAddress(address), provider: "privy" };
}

module.exports = { preGenerate, devAddressForEmail };
