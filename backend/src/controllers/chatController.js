const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const chatModel = require("../models/chatModel");
const listingModel = require("../models/listingModel");

// POST /chat/conversations { listingId }  — buyer opens a chat with the agent.
const openConversation = asyncHandler(async (req, res) => {
  const { listingId } = req.body;
  if (!listingId) throw ApiError.badRequest("listingId is required");

  const listing = await listingModel.getById(listingId);
  if (!listing) throw ApiError.notFound("listing not found");
  if (!listing.created_by) throw ApiError.badRequest("this listing has no agent to chat with");
  if (listing.created_by === req.user.id) throw ApiError.badRequest("you are the agent on this listing");

  const conversation = await chatModel.getOrCreate(listing, req.user.id);
  res.status(201).json(conversation);
});

// GET /chat/conversations  — all of my conversations (as buyer or agent).
const listConversations = asyncHandler(async (req, res) => {
  res.json(await chatModel.listForUser(req.user.id));
});

// GET /chat/conversations/:id/messages  — history (members only).
const getMessages = asyncHandler(async (req, res) => {
  const conversation = await chatModel.getById(req.params.id);
  if (!conversation) throw ApiError.notFound("conversation not found");
  if (!chatModel.isMember(conversation, req.user.id)) throw ApiError.forbidden();
  res.json(await chatModel.messages(req.params.id));
});

module.exports = { openConversation, listConversations, getMessages };
