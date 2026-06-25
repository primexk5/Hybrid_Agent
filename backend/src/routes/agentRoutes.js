const express = require("express");
const ctrl = require("../controllers/agentController");

const router = express.Router();

router.get("/", ctrl.leaderboard);
router.get("/:id", ctrl.getOne);

module.exports = router;
