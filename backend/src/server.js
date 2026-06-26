const http = require("http");
const app = require("./app");
const config = require("./config");
const db = require("./config/db");
const indexer = require("./indexer");
const { initSocket } = require("./socket");

async function main() {
  if (!config.databaseUrl) {
    console.error("DATABASE_URL is not set. Configure your Postgres connection string.");
    process.exit(1);
  }

  if (config.env === "production") {
    if (config.jwtSecret.startsWith("dev-")) throw new Error("JWT_SECRET must be set in production");
    if (config.keyEncryptionSecret.startsWith("dev-")) throw new Error("KEY_ENCRYPTION_SECRET must be set in production");
  }

  await db.init();
  console.log("[db] schema ready");

  const server = http.createServer(app);
  initSocket(server);
  console.log("[socket] chat gateway ready");

  server.listen(config.port, () => {
    console.log(`[api] listening on http://localhost:${config.port}`);
    indexer.start();
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
