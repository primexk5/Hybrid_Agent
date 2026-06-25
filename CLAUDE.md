# CLAUDE.md

Guidance for working in this repository.

## What this project is

**HybridAgent** is a global marketplace for selling **property and vehicles**,
where the buyer's payment settles fully **on-chain in USDC** and agent
commissions are split automatically by an escrow contract. It exists to solve a
real problem: agents who broker a sale for an owner getting cheated out of their
commission after the deal closes.

Core rule (the "free market" model):

- An owner can sell their **own** asset → `owner_direct` listing → **no commission**.
- An agent can sell on **someone else's** behalf → `agent_brokered` listing →
  agent earns a commission, split atomically at settlement.
- A user can be both owner and agent; the role is **per-listing**, not per-account.

## Repository layout

```
frontend/   Next.js 15 (App Router) + React 19 + Tailwind v4 — the UI
contracts/  Hardhat + Solidity 0.8.24 — escrow + mandate registry (USDC)
backend/    Express + Railway Postgres — off-chain data + on-chain indexer
```

### frontend/
Next.js app under `frontend/app/` (App Router, all `.jsx`). Pages: `Hero` (home),
`Listings` + `Listings/[id]`, `Leaderboard`, `Reviews`, `Profile`, `Login`,
`Registration`, `LearnMore`, `Contact`. Components split into `components/Atoms`
and `components/Molecules`. Theming via a custom `ThemeProvider` (`resolvedTheme`,
light/dark) with an anti-flash script in `app/layout.jsx`.

Currently the listing/leaderboard data is hardcoded (`Listings/listings.js`,
`Leaderboard/leaderboard.js`), auth is mock (localStorage `currentUser` +
`authChanged` event), and `components/Atoms/ConnectWallet.jsx` is a stub. These
are the integration points to wire to the backend + chain.

### contracts/
- `MandateRegistry.sol` — owner authorizes an agent to broker a listing for an
  agreed commission/expiry; agent accepts. Source of truth for commission.
- `HybridEscrow.sol` — full-settlement USDC escrow. Buyer funds full price;
  on completion pays **agent → commission**, **platform → fee**, **seller →
  remainder**, atomically. Supports dispute → arbiter resolution and
  seller claim after a timeout window.
- `mocks/MockUSDC.sol` — 6-decimal test token (local/testnet only).

Money values are USDC **base units (6 decimals)**. Commission/fees are in **bps**
(100 = 1%). Commission is capped at 3000 bps, platform fee at 1000 bps.

### backend/
Express API + event indexer, **layered** (`config / middleware / controllers /
models / routes / utils`, plus `indexer/`, `app.js`, `server.js`). Non-custodial
for funds — deal/mandate transactions happen on-chain from the user's wallet.
The backend:
- handles **auth/users** (register, login, `/me`, KYC) in **Railway Postgres** (`pg`),
- stores off-chain listing data and uploads images to **Cloudinary** via **Multer**,
- **indexes** `MandateRegistry`/`HybridEscrow` events (ethers v6, polling
  `getLogs`) into Postgres for fast reads.

Security stack: **Helmet**, **CORS**, **express-rate-limit**, **bcryptjs**,
**JWT**, **Joi**. Errors flow through `ApiError` + `middleware/error.js`; wrap
async handlers in `utils/asyncHandler`.

**Identity = account → wallet → KYC.** Register creates the account (bcrypt) and
an embedded wallet (Tier 1; private key AES-256-GCM encrypted at rest — custodial
MVP, move to Privy/Web3Auth for prod). KYC (Tier 2) is a mock endpoint that gates
transacting routes via `requireKyc`; swap in Sumsub/Persona/Onfido later.

A listing's `listing_ref` (bytes32) is the link between an off-chain listing row
and its on-chain mandate/deal.

## Commands

```bash
# Frontend
cd frontend && npm run dev        # Next dev server (Turbopack) on :3000

# Contracts
cd contracts && npm test          # Hardhat tests (both flows + disputes)
npm run deploy:local              # against `npx hardhat node`
npm run deploy:baseSepolia        # public testnet (needs .env)

# Backend
cd backend && npm run dev         # Express + indexer on :4000 (needs .env)
```

Each subproject has its own `package.json` and `.env.example`. After deploying
contracts, copy the printed addresses into `backend/.env`.

## Conventions

- **Currency:** all on-chain settlement is **ETH (gas) + USDC (value)**. Do not
  introduce other stablecoins (cNGN, etc.) unless asked.
- **Solidity:** OpenZeppelin primitives (`SafeERC20`, `Ownable`,
  `ReentrancyGuard`); events for everything the indexer needs.
- **Backend:** parameterized SQL ($1, $2…); Postgres upserts via
  `ON CONFLICT ... DO UPDATE`; keep write-paths on-chain, reads off-chain.
- **Frontend:** match existing Tailwind/dark-mode patterns and the
  Atoms/Molecules component split.
- **Git commits:** plain messages — **do not** add a `Co-Authored-By: Claude`
  trailer.

## Status / not yet built

- Frontend is not yet wired to the backend or chain (still hardcoded data + mock
  auth + stub wallet).
- No real wallet/account-abstraction integration yet (planned: embedded smart
  wallet, email/phone login).
- KYC, fiat on/off-ramps, and on-chain-earned leaderboard/reviews are roadmap.
