const express = require("express");
const ctrl = require("../controllers/mandateController");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

module.exports = router;
