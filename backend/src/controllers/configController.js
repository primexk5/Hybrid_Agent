const config = require("../config");

// GET /config — public chain config the frontend needs to talk to the contracts.
function get(req, res) {
  res.json({
    chainId: config.chainId,
    rpcUrl: config.rpcUrl,
    contracts: {
      usdc: config.usdcAddress,
      mandateRegistry: config.mandateRegistryAddress,
      hybridEscrow: config.hybridEscrowAddress,
    },
    chainConfigured: config.chainConfigured,
  });
}

module.exports = { get };
