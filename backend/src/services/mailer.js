const { Resend } = require("resend");
const config = require("../config");

async function send({ to, subject, text }) {
  if (config.email.configured) {
    const resend = new Resend(config.email.apiKey);
    await resend.emails.send({
      from: config.email.from,
      to,
      subject,
      text,
    });
    return { ok: true, channel: "resend" };
  }
  console.log(`\n──────── EMAIL ────────\nTo: ${to}\nSubject: ${subject}\n\n${text}\n───────────────────────\n`);
  return { ok: true, channel: "console" };
}

const claimLink = (listingId) => `${config.appBaseUrl}/claim?listingId=${listingId}`;

// Sent when an agent lists an owner's asset.
function sendListingNotice({ to, ownerName, agentName, title, listingId }) {
  return send({
    to,
    subject: `${agentName} listed your property on HybridAgent`,
    text:
      `Hi ${ownerName || "there"},\n\n` +
      `${agentName} has listed "${title}" for sale on HybridAgent on your behalf.\n` +
      `A secure wallet has been reserved for you using this email address. When the ` +
      `sale completes, your proceeds are paid there automatically — no one can ` +
      `intercept them.\n\n` +
      `Verify & track your sale:\n${claimLink(listingId)}\n`,
  });
}

// Sent when the escrow contract releases funds (deal completed).
function sendClaimReady({ to, title, listingId }) {
  return send({
    to,
    subject: "Your funds are ready to claim",
    text:
      `Good news — the sale of "${title}" has completed and your funds are ready.\n\n` +
      `Sign in with this email (magic link) to open your wallet and withdraw:\n` +
      `${claimLink(listingId)}\n`,
  });
}

module.exports = { send, sendListingNotice, sendClaimReady };
