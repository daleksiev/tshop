const admin = require('../config/firebase');
const userService = require('../services/userService');

module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    authorization = authorization.split('Bearer ').join('');
    admin
        .auth()
        .verifyIdToken(authorization)
        .then((token) => userService.getOne({ firebaseId: token.uid }))
        .then(user => {
            if (!user) throw user;

            req.isLoggedIn = true;
            next();
        })
        .catch((err) => {
            res.json({ ok: false, ...err })
        });
}