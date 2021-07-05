// References:
// https://stackoverflow.com/questions/47515991/how-to-setup-an-authentication-middleware-in-express-js#47516387
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const jwt = require('jsonwebtoken');

module.exports.isAuthorized  = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json(errGen(401));
    const bearer = req.headers.authorization.replace("Bearer ", "");

    jwt.verify(bearer, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json(errGen(403));
        req.user = user;
        return next();
    });
}
