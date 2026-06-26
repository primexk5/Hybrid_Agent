const db = require("../config/filebaseDB");
const userModel = require("./userModel");
const reviewModel = require("./reviewModel");

async function buildAgentStats(user) {
  const walletAddr = (user.wallet_address || "").toLowerCase();
  const [stats, listingCount, salesCount] = await Promise.all([
    reviewModel.summary(user.id),
    db.listKeys(`db/listings/by-creator/${user.id}/`).then((keys) => keys.length),
    db.getAll("db/deals/records/").then(
      (deals) => deals.filter((d) => d && d.state === "completed" && d.agent_address === walletAddr).length
    ),
  ]);
  return {
    id: user.id,
    full_name: user.full_name,
    user_name: user.user_name,
    avatar: user.avatar,
    bio: user.bio,
    kyc_status: user.kyc_status,
    rating: stats.rating,
    review_count: stats.count,
    listing_count: listingCount,
    sales_count: salesCount,
  };
}

async function leaderboard() {
  const agents = await userModel.findAllAgents();
  const withStats = await Promise.all(agents.map(buildAgentStats));
  return withStats.sort(
    (a, b) => b.rating - a.rating || b.review_count - a.review_count || b.sales_count - a.sales_count
  );
}

async function getById(id) {
  const user = await userModel.findById(id);
  if (!user || user.user_type !== "agent") return null;
  return buildAgentStats(user);
}

module.exports = { leaderboard, getById };
