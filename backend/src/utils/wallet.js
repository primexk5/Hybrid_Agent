const { ethers } = require("ethers");
const { encrypt } = require("./crypto");

// Tier 1: create an embedded wallet for a user on registration so they never
// handle a seed phrase. The private key is encrypted before it is stored.
//
// NOTE: this is a custodial MVP. For production, move to a non-custodial
// embedded wallet (Privy / Web3Auth MPC) so the server never holds raw keys.
function createEmbeddedWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    encryptedKey: encrypt(wallet.privateKey),
  };
}

module.exports = { createEmbeddedWallet };
