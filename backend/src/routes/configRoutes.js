const express = require("express");
const ctrl = require("../controllers/configController");

const router = express.Router();

router.get("/", ctrl.get);

module.exports = router;
