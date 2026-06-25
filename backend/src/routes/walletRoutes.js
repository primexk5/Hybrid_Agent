const express = require("express");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/walletController");

const router = express.Router();

router.use(requireAuth);
router.get("/", ctrl.get);
router.post("/withdraw", ctrl.withdraw);

module.exports = router;
