const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimit");
const avatarUpload = require("../middleware/avatarUpload");
const { registerSchema, loginSchema } = require("../utils/validators");
const ctrl = require("../controllers/authController");

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), ctrl.register);
router.post("/login", authLimiter, validate(loginSchema), ctrl.login);
router.get("/me", requireAuth, ctrl.me);
router.patch("/avatar", requireAuth, avatarUpload.single("avatar"), ctrl.updateAvatar);
router.post("/kyc/verify", requireAuth, ctrl.verifyKyc);

module.exports = router;
