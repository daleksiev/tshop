const admin = require('../config/firebase');

module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    authorization = authorization.split('Bearer ').join('');
    admin
        .auth()
        .verifyIdToken(authorization)
        .then((token) => {
            req.token = token;
            next();
        })
        .catch((err) => {
            res.json({ ok: false, ...err })
        });
}