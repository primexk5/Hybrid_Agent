const express = require("express");
const ctrl = require("../controllers/claimController");

const router = express.Router();

router.get("/:listingId", ctrl.get);

module.exports = router;
