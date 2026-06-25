const multer = require("multer");
const ApiError = require("../utils/ApiError");

function notFound(req, res) {
  res.status(404).json({ error: "not found" });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }
  if (err instanceof multer.MulterError) {
    const msg = err.code === "LIMIT_FILE_SIZE" ? "Image is too large" : err.message;
    return res.status(400).json({ error: msg });
  }
  if (err.message === "only image uploads are allowed") {
    return res.status(400).json({ error: err.message });
  }
  // Postgres unique violation
  if (err.code === "23505") {
    return res.status(409).json({ error: "resource already exists" });
  }
  console.error(err);
  res.status(500).json({ error: "internal error" });
}

module.exports = { notFound, errorHandler };
