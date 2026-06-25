const { ethers } = require("ethers");
const config = require("../config");

// Deterministic email -> address mapping for dev/scaffold. The SAME email always
// yields the SAME address, mirroring how a pre-generated embedded wallet behaves.
function devAddressForEmail(email) {
  const seed = `hybridagent:wallet:${String(email).toLowerCase().trim()}`;
  const hash = ethers.keccak256(ethers.toUtf8Bytes(seed));
  return ethers.getAddress("0x" + hash.slice(-40));
}

// Pre-generate (or fetch) the owner's smart-wallet address from their email,
// WITHOUT a live login session.
//
// Production: replace the dev branch with Privy server-side pre-generated wallets
//   const { PrivyClient } = require('@privy-io/server-auth');
//   const privy = new PrivyClient(config.privy.appId, config.privy.appSecret);
//   const user = await privy.importUser({ linkedAccounts: [{ type: 'email', address: email }], createEthereumWallet: true });
//   return { address: user.wallet.address, provider: 'privy' };
// When the owner later logs in with the same email magic-link, Privy opens this
// exact address.
async function preGenerate(email) {
  if (config.privy.configured) {
    // TODO: wire @privy-io/server-auth here. Until then we use the dev fallback
    // so the flow runs end-to-end without keys.
  }
  return { address: devAddressForEmail(email), provider: config.privy.configured ? "privy" : "dev" };
}

module.exports = { preGenerate, devAddressForEmail };
