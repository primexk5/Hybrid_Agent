const bcrypt = require("bcryptjs");
const config = require("../config");

function hash(plain) {
  return bcrypt.hash(plain, config.bcryptRounds);
}

function compare(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

module.exports = { hash, compare };
