// Shorten a 0x address for display: 0x1234…abcd
export const shortAddress = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

// USDC base units (6 decimals) -> human string.
export const formatUsdc = (baseUnits) => {
  try {
    const n = Number(BigInt(baseUnits)) / 1e6;
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  } catch {
    return '0';
  }
};

// The progressive identity tiers shown on the profile.
export const TIERS = [
  { level: 0, label: 'Account', short: 'Registered' },
  { level: 1, label: 'Wallet Ready', short: 'Wallet created' },
  { level: 2, label: 'Verified', short: 'Identity verified' },
];

export const tierInfo = (user) => {
  if (!user) return { level: 0, ...TIERS[0], color: 'gray' };
  if (user.kyc_status === 'verified') return { ...TIERS[2], color: 'teal' };
  if (user.wallet_address) return { ...TIERS[1], color: 'amber' };
  return { ...TIERS[0], color: 'gray' };
};

export const timeAgo = (ts) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};
