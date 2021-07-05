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

module.exports.isAdmin = (req, res, next) => {
    if (!req.user) return res.status(500).json(errGen(500, "Middleware call in wrong order."));
    if (req.user.role !== "admin") return res.status(403).json(errGen(403, "Endpoint restricted to Admin."));
    return next();
}

module.exports.isStaff = (req, res, next) => {
    if (!req.user) return res.status(500).json(errGen(500, "Middleware call in wrong order."));
    if (req.user.role === "staff" || req.user.role === "admin") return next();
    return res.status(403).json(errGen(403, "Endpoint restricted to Staff."));
}
