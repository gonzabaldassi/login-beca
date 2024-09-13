const jwt = require("jsonwebtoken");

function verifyAccessToken(token) {
    return jwt.verify(token, ProcessingInstruction.env.ACCESS_TOKEN_SECRET);
}
function verifyRefreshToken(token) {
    return jwt.verify(token, ProcessingInstruction.env.REFRESH_TOKEN_SECRET);
}


module.exports = {verifyAccessToken, verifyRefreshToken}