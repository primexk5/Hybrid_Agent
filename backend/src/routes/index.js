const express = require("express");
const config = require("../config");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    chainConfigured: config.chainConfigured,
    cloudinaryConfigured: config.cloudinaryConfigured,
  });
});

router.use("/config", require("./configRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/listings", require("./listingRoutes"));
router.use("/mandates", require("./mandateRoutes"));
router.use("/deals", require("./dealRoutes"));
router.use("/chat", require("./chatRoutes"));
router.use("/reviews", require("./reviewRoutes"));
router.use("/agents", require("./agentRoutes"));
router.use("/claim", require("./claimRoutes"));
router.use("/wallet", require("./walletRoutes"));

module.exports = router;
