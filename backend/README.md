# HybridAgent — Backend API

Express + Postgres (Railway) service for the HybridAgent escrow marketplace. It
handles auth/users, off-chain listing data + image uploads, and indexes on-chain
escrow/mandate state. It is **non-custodial for funds** — money and mandate
writes happen on-chain from the user's wallet; the backend never signs deal
transactions.

## Architecture (layered)

```
src/
  config/       env (index.js), Postgres pool + schema (db.js), ethers (chain.js), Cloudinary
  middleware/   auth (JWT + KYC gate), validate (Joi), rateLimit, upload (multer), error
  models/       SQL data access: userModel, listingModel, mandateModel, dealModel
  controllers/  request handlers: auth, listing, mandate, deal, config
  routes/       express routers, mounted in routes/index.js
  utils/        jwt, password (bcrypt), crypto (AES-GCM), wallet, validators (Joi), ApiError
  indexer/      polls contract events into Postgres
  app.js        express app (helmet, cors, rate limit, routes, error handler)
  server.js     bootstrap: db.init() then listen + start indexer
```

Security stack: **Helmet**, **CORS**, **express-rate-limit** (stricter on auth),
**bcryptjs** password hashing, **JWT** sessions, **Joi** request validation.

## Setup

```bash
cp .env.example .env      # DATABASE_URL, JWT_SECRET, KEY_ENCRYPTION_SECRET, Cloudinary…
npm install
npm run dev               # nodemon, or: npm start
```

`DATABASE_URL` comes from Railway (Postgres plugin); keep `PGSSL=true` there.
Contract addresses stay blank until the contracts are deployed (not yet).

## Identity model: account → wallet → KYC

- **Register** creates the app account (bcrypt-hashed password) **and** an
  embedded wallet (Tier 1) so the user never handles a seed phrase. The wallet
  private key is AES-256-GCM encrypted at rest with `KEY_ENCRYPTION_SECRET`.
  > MVP note: this embedded wallet is **custodial**. For production move to a
  > non-custodial provider (Privy / Web3Auth MPC) so the server never holds keys.
- **KYC (Tier 2)** gates money-moving actions. `kyc_status` starts `unverified`;
  `POST /auth/kyc/verify` flips it to `verified`. This endpoint is a **mock** —
  in production it's the return/webhook from Sumsub / Persona / Onfido after an
  ID + liveness check. Routes that transact use the `requireKyc` middleware.

## Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/health` | — | liveness + chain/Cloudinary configured flags |
| GET | `/config` | — | chainId, RPC, contract addresses (for the frontend) |
| POST | `/auth/register` | — | create account + embedded wallet; returns `{ token, user }` |
| POST | `/auth/login` | — | returns `{ token, user }` |
| GET | `/auth/me` | Bearer | current user |
| POST | `/auth/kyc/verify` | Bearer | mock KYC → `verified` |
| GET | `/listings?assetType=&status=` | — | list off-chain listings |
| GET | `/listings/:id` | — | one listing |
| POST | `/listings` | Bearer + KYC | create listing (`multipart/form-data`, optional `image` file) |
| GET | `/mandates?owner=&agent=&status=` | — | indexed on-chain mandates |
| GET | `/deals?buyer=&seller=&agent=&state=` | — | indexed on-chain deals |
| GET | `/deals/quote?price=&commissionBps=&platformFeeBps=` | — | split preview (base units) |

### Creating a listing (`POST /listings`, multipart/form-data)

The authed user is the seller-side actor:
- `owner_direct` → they are the owner; `owner_address` defaults to their wallet.
- `agent_brokered` → they are the agent (their wallet = `agent_address`);
  `ownerAddress` (the seller) and `commissionBps` (1..3000) are required.

Fields: `assetType` (property|vehicle), `listingType`, `title`, `priceUsdc`,
optional `description`, optional `image` (file → Cloudinary, or a URL string).
Returns the row including a `listing_ref` (bytes32) used to link the on-chain
mandate/deal.

## Indexer

Polls `getLogs` every `POLL_INTERVAL_MS`, parses `MandateRegistry` /
`HybridEscrow` events, upserts `mandates` / `deals`, and advances a stored
`lastBlock` cursor. Deal state transitions also flip the linked listing's status
(open → pending → sold, or back to open on refund/cancel). It self-disables until
contract addresses are configured.
