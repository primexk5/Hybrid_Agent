const express = require("express");
const ctrl = require("../controllers/dealController");

const router = express.Router();

router.get("/quote", ctrl.quote);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

module.exports = router;
