const jwt = require("jsonwebtoken")

function signToken(payload) {
  return token = jwt.sign(payload, "kopikap")
}

function verifyToken(token) {
  return decoded = jwt.verify(token, "kopikap")
}

module.exports = {
  signToken,
  verifyToken
}