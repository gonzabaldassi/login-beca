const { generateAccessToken } = require("../auth/generateTokens");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { verifyRefreshToken } = require("../auth/verifyTokens");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");

const router = require("express").Router();

router.post("/", async (req, res)=>{
    const refreshToken = getTokenFromHeader(req.headers);

    if (!refreshToken) {
        res.status(401).send(jsonResponse(401,{ error:"Unauthorized"}));
    }

    try {
        const found = await Token.findOne({token:refreshToken});

        if (!found) {
            res.status(401).send(jsonResponse(401,{ error:"Unauthorized"}));
        }

        const payload = verifyRefreshToken(found.token);

        if (!payload) {
            res.status(401).send(jsonResponse(401,{ error:"Unauthorized"}));
        }

        const accessToken = generateAccessToken(payload.user);

        return res.status(200).json(200,{accessToken});


    } catch (error) {
        res.status(401).send(jsonResponse(401,{ error:"Unauthorized"}));
    }
});

module.exports = router;