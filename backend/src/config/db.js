const { Pool } = require("pg");
const config = require("./index");

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.pgSsl ? { rejectUnauthorized: false } : false,
});

function query(text, params) {
  return pool.query(text, params);
}

async function withTx(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function init() {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS users (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name       TEXT NOT NULL,
      user_name       TEXT UNIQUE NOT NULL,
      email           TEXT UNIQUE NOT NULL,
      phone_number    TEXT,
      password_hash   TEXT NOT NULL,
      user_type       TEXT NOT NULL,            -- 'agent' | 'owner'
      gender          TEXT,
      bio             TEXT,
      avatar          TEXT,
      wallet_address  TEXT UNIQUE,              -- embedded wallet (Tier 1)
      wallet_enc_key  TEXT,                     -- AES-GCM encrypted private key
      kyc_status      TEXT NOT NULL DEFAULT 'unverified', -- unverified|pending|verified
      kyc_level       INTEGER NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS meta (
      key   TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS listings (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      listing_ref    TEXT UNIQUE NOT NULL,
      asset_type     TEXT NOT NULL,
      listing_type   TEXT NOT NULL,
      title          TEXT NOT NULL,
      description    TEXT,
      image          TEXT,
      price_usdc     TEXT NOT NULL,
      owner_address  TEXT,                       -- payout address; null until owner attached
      owner_name     TEXT,                       -- off-platform owner the agent is selling for
      owner_contact  TEXT,
      owner_email    TEXT,                       -- owner's email; pre-generates ownerWallet
      owner_status   TEXT DEFAULT 'pending',     -- 'self' | 'pending' | 'pending_verification' | 'confirmed'
      agent_address  TEXT,
      commission_bps INTEGER DEFAULT 0,
      status         TEXT DEFAULT 'open',
      created_by     UUID REFERENCES users(id),
      created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS mandates (
      mandate_id     BIGINT PRIMARY KEY,
      owner_address  TEXT NOT NULL,
      agent_address  TEXT NOT NULL,
      listing_ref    TEXT NOT NULL,
      commission_bps INTEGER NOT NULL,
      expiry         BIGINT NOT NULL,
      status         TEXT NOT NULL,
      tx_hash        TEXT,
      block_number   BIGINT
    );

    CREATE TABLE IF NOT EXISTS deals (
      deal_id          BIGINT PRIMARY KEY,
      listing_ref      TEXT,
      buyer_address    TEXT NOT NULL,
      seller_address   TEXT NOT NULL,
      agent_address    TEXT,
      price            TEXT NOT NULL,
      commission_bps   INTEGER DEFAULT 0,
      platform_fee_bps INTEGER DEFAULT 0,
      mandate_id       BIGINT DEFAULT 0,
      state            TEXT NOT NULL,
      dispute_deadline BIGINT,
      tx_hash          TEXT,
      block_number     BIGINT
    );

    -- Agent reviews by users (rated on communication + professionalism).
    CREATE TABLE IF NOT EXISTS reviews (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      agent_id        UUID NOT NULL REFERENCES users(id),
      reviewer_id     UUID NOT NULL REFERENCES users(id),
      rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      communication   INTEGER CHECK (communication BETWEEN 1 AND 5),
      professionalism INTEGER CHECK (professionalism BETWEEN 1 AND 5),
      comment         TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (agent_id, reviewer_id)
    );
    CREATE INDEX IF NOT EXISTS idx_reviews_agent ON reviews (agent_id);

    -- On-platform chat between a buyer and a listing's agent.
    CREATE TABLE IF NOT EXISTS conversations (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      listing_id  UUID REFERENCES listings(id) ON DELETE CASCADE,
      buyer_id    UUID NOT NULL REFERENCES users(id),
      agent_id    UUID NOT NULL REFERENCES users(id),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (listing_id, buyer_id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      sender_id       UUID NOT NULL REFERENCES users(id),
      body            TEXT NOT NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages (conversation_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_conv_buyer ON conversations (buyer_id);
    CREATE INDEX IF NOT EXISTS idx_conv_agent ON conversations (agent_id);
    CREATE INDEX IF NOT EXISTS idx_listings_asset ON listings (asset_type);
    CREATE INDEX IF NOT EXISTS idx_mandates_agent ON mandates (agent_address);
    CREATE INDEX IF NOT EXISTS idx_deals_buyer ON deals (buyer_address);
    CREATE INDEX IF NOT EXISTS idx_deals_agent ON deals (agent_address);

    -- Buyer purchase requests: links a buyer to a listing and tracks on-chain deal progress.
    CREATE TABLE IF NOT EXISTS purchase_requests (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      listing_id    UUID REFERENCES listings(id) ON DELETE CASCADE,
      buyer_id      UUID NOT NULL REFERENCES users(id),
      buyer_address TEXT NOT NULL,
      deal_id       BIGINT,
      status        TEXT NOT NULL DEFAULT 'requested',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (listing_id, buyer_id)
    );
    CREATE INDEX IF NOT EXISTS idx_pr_listing ON purchase_requests (listing_id);
    CREATE INDEX IF NOT EXISTS idx_pr_buyer ON purchase_requests (buyer_id);

    -- Migrations for agent-led listings (safe on an already-created table).
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS owner_name TEXT;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS owner_contact TEXT;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS owner_email TEXT;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS owner_status TEXT DEFAULT 'pending';
    ALTER TABLE listings ALTER COLUMN owner_address DROP NOT NULL;
  `);
}

async function getMeta(key, fallback = null) {
  const { rows } = await pool.query("SELECT value FROM meta WHERE key = $1", [key]);
  return rows.length ? rows[0].value : fallback;
}

async function setMeta(key, value) {
  await pool.query(
    "INSERT INTO meta (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
    [key, String(value)]
  );
}

module.exports = { pool, query, withTx, init, getMeta, setMeta };
