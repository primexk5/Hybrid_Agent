const express = require("express");
const upload = require("../middleware/upload");
const validate = require("../middleware/validate");
const { requireAuth, requireKyc } = require("../middleware/auth");
const { createListingSchema, attachOwnerSchema } = require("../utils/validators");
const ctrl = require("../controllers/listingController");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/mine", requireAuth, ctrl.mine);
router.get("/:id", ctrl.getOne);

// Creating a listing is a transacting action -> auth + KYC required.
// multer parses multipart/form-data (so req.body is populated) before validation.
router.post(
  "/",
  requireAuth,
  requireKyc,
  upload.single("image"),
  validate(createListingSchema),
  ctrl.create
);

// Attach the off-platform owner's payout address (just-in-time, before settlement).
router.patch("/:id/owner", requireAuth, validate(attachOwnerSchema), ctrl.attachOwner);

module.exports = router;
