// @description    middleware, verify the request header includes JWT token/ extract it from the header
const jwtExtractToken = (req,res,next) => {
    // extract token from header
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader !== undefined) {
        const token = bearerHeader.split(' ');
        // the actual token is at index 1
        // set the req.token to jwt token format/ remove the 'bearer' part
        req.token = token[1];
        // next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

module.exports = {
    jwtExtractToken
}