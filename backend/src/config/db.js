// Filebase-backed key-value meta store (replaces PostgreSQL).
// All structured data is now stored as JSON objects in Filebase S3.
const fdb = require("./filebaseDB");

const META_PREFIX = "db/meta/";

async function getMeta(key, fallback = null) {
  const record = await fdb.get(`${META_PREFIX}${encodeURIComponent(key)}.json`);
  return record !== null ? record.value : fallback;
}

async function setMeta(key, value) {
  await fdb.put(`${META_PREFIX}${encodeURIComponent(key)}.json`, { value });
}

async function init() {
  console.log("[db] using Filebase (IPFS) as document store — no SQL needed");
}

module.exports = { getMeta, setMeta, init };
