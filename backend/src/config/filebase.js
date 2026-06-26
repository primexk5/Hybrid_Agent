const { S3Client, PutObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const config = require("./index");

const GATEWAY = "https://ipfs.filebase.io/ipfs";

let _client = null;
function client() {
  if (!_client) {
    _client = new S3Client({
      endpoint: "https://s3.filebase.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: config.filebase.accessKey,
        secretAccessKey: config.filebase.secretKey,
      },
      forcePathStyle: true,
    });
  }
  return _client;
}

// Upload an in-memory buffer to Filebase (IPFS-pinned S3).
// Returns the public IPFS gateway URL: https://ipfs.filebase.io/ipfs/<CID>
async function uploadBuffer(buffer, mimetype = "image/jpeg", folder = config.filebase.folder) {
  if (!config.filebaseConfigured) throw new Error("Filebase is not configured");
  const ext = (mimetype.split("/")[1] || "bin").split("+")[0]; // e.g. "jpeg", "png", "webp"
  const key = folder ? `${folder}/${uuidv4()}.${ext}` : `${uuidv4()}.${ext}`;

  await client().send(
    new PutObjectCommand({
      Bucket: config.filebase.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    })
  );

  // Filebase stores the IPFS CID in the object's user-defined metadata.
  const head = await client().send(
    new HeadObjectCommand({ Bucket: config.filebase.bucket, Key: key })
  );

  const cid = head.Metadata?.cid;
  if (!cid) throw new Error("Filebase did not return an IPFS CID for the uploaded object");

  return `${GATEWAY}/${cid}`;
}

module.exports = { uploadBuffer };
