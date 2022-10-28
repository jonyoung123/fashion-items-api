const jwt = require('jsonwebtoken');
const JWT_SECRET = 'john5646john5646john5646john5646???'

function isTokenValid(token){
    const decodedJWT = jwt.verify(token, JWT_SECRET);
    if(decodedJWT === null || decodedJWT === undefined)
        return false;
    return true;
}

module.exports = isTokenValid;