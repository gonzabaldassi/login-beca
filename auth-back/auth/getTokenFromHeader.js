//Busca el token de autenticación en el campo authorization del encabezado HTTP y lo devuelve si está presente y es válido.
function getTokenFromHeader(headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null;
    }
}

module.exports = getTokenFromHeader;