const multer = require("multer");

// Profile picture upload: in-memory, images only, hard 1 MB limit.
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("only image uploads are allowed"));
  },
});
