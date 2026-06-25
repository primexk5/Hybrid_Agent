const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { reviewSchema } = require("../utils/validators");
const ctrl = require("../controllers/reviewController");

const router = express.Router();

router.get("/recent", ctrl.recent);
router.get("/eligibility", requireAuth, ctrl.eligibility);
router.get("/", ctrl.listForAgent);
router.post("/", requireAuth, validate(reviewSchema), ctrl.create);

module.exports = router;
