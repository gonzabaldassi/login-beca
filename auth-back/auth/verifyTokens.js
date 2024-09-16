const jwt = require("jsonwebtoken");

function verifyAccessToken(token) {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return decoded;
}
module.exports = { verifyAccessToken, verifyRefreshToken };