require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {
  RPC_URL_SEPOLIA,
  ALCHEMY_API_KEY,
  RPC_URL_BASE_SEPOLIA,
  RPC_URL_ARBITRUM_SEPOLIA,
  PRIVATE_KEY,
  BASESCAN_API_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: RPC_URL_SEPOLIA || ALCHEMY_API_KEY || "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts,
    },
    baseSepolia: {
      url: RPC_URL_BASE_SEPOLIA || "https://sepolia.base.org",
      chainId: 84532,
      accounts,
    },
    base: {
      url: process.env.RPC_URL_BASE || "https://mainnet.base.org",
      chainId: 8453,
      accounts,
    },
    arbitrumSepolia: {
      url: RPC_URL_ARBITRUM_SEPOLIA || "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts,
    },
  },
  // Contract verification (npx hardhat verify ...). Etherscan V2 is a single
  // multichain endpoint, so one Etherscan.io API key covers Ethereum, Base and
  // Arbitrum — chains are resolved by chainId, no customChains needed.
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || BASESCAN_API_KEY || "",
  },
};
