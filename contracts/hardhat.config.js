require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { RPC_URL_BASE_SEPOLIA, RPC_URL_ARBITRUM_SEPOLIA, PRIVATE_KEY } = process.env;

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
    baseSepolia: {
      url: RPC_URL_BASE_SEPOLIA || "https://sepolia.base.org",
      chainId: 84532,
      accounts,
    },
    arbitrumSepolia: {
      url: RPC_URL_ARBITRUM_SEPOLIA || "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts,
    },
  },
};
