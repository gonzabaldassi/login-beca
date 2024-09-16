const { generateAccessToken } = require("../auth/generateTokens");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { verifyRefreshToken } = require("../auth/verifyTokens");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");

const router = require("express").Router();
router.post("/", async (req, res, next) => {
    /* log.info("POST /api/refresh-token"); */
    const refreshToken = getTokenFromHeader(req.headers);

    if (refreshToken) {
      try {
        const found = await Token.findOne({ token: refreshToken });
    
        if (!found) {
          return res.status(403).json({ error: "Token de actualización inválido" });
        }
        
        const payload = verifyRefreshToken(found.token);

        if (payload) {
          const accessToken = generateAccessToken(getUserInfo(payload.user));

          return res.json(jsonResponse(200, { accessToken }));
        }else{
          return res.status(401).json({ error: "Unauthorized" });
        }
        
      } catch (error) {
        return res.status(403).json({ error: "Token de actualización inválido" });
      }
    }else{
      return res.status(401).json({ error: "Token de actualización no proporcionado" });
    }
  });
module.exports = router;