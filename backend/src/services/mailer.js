const config = require("../config");

// Send a transactional email. In dev (no provider configured) it logs to the
// console so the whole flow is observable without keys.
//
// Production: integrate a provider, e.g. Resend:
//   const { Resend } = require('resend');
//   await new Resend(config.email.apiKey).emails.send({ from: config.email.from, to, subject, text });
async function send({ to, subject, text }) {
  if (config.email.configured) {
    // TODO: wire the real email provider here.
  }
  console.log(`\n──────── EMAIL ────────\nTo: ${to}\nSubject: ${subject}\n\n${text}\n───────────────────────\n`);
  return { ok: true, channel: config.email.configured ? "provider" : "console" };
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
