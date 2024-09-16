const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");
//Middleware para proteger rutas.

//Next es que si estoy autenticado correctamente, dejo pasar a la proxima sol
function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    if (token) {
        const decoded = verifyAccessToken(token); //Si esta decoded significa que el user esta autenticado

        if (decoded) {
            req.user = {...decoded.user}
            next();
        }else{
            res.status(401).json(
                jsonResponse(401,{
                    message:"No token provided",
                })
            );
        }

    }else{
        res.status(401).json(
            jsonResponse(401,{
                message:"No token provided",
            })
        );
    }
}

module.exports = authenticate;