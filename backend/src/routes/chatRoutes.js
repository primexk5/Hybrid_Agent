const express = require("express");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/chatController");

const router = express.Router();

router.use(requireAuth);
router.post("/conversations", ctrl.openConversation);
router.get("/conversations", ctrl.listConversations);
router.get("/conversations/:id/messages", ctrl.getMessages);

module.exports = router;
