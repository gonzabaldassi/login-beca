const jwt = require("jsonwebtoken");
require("dotenv").config();

function sign(payload, isAccessToken) {
  return jwt.sign(
    payload,
    isAccessToken
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: 3600,
    }
  );
}

// Función para generar un token de acceso utilizando jsonwebtoken
function generateAccessToken(user) {
  return sign({ user }, true);
}
function generateRefreshToken(user) {
  return sign({ user }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };