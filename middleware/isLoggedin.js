const { isTokenActive } = require('../Services/token')

function isLoggedin(req, res, next) {
    if (!req.headers.authorization) { return res.status(401).json("Unauthorized") }
    if (!req.headers.authorization.startsWith("Bearer ")) { return res.status(401).json("Unauthorized") }

    const token = req.headers.authorization.split(" ")[1];
    console.log("checked token: " + token);
    if (token && isTokenActive(token)) {
        console.log("Authorized via middleware");
        next();
    } else {
        res.status(401).json("Unauthorized");
    }
}

module.exports = { isLoggedin };
