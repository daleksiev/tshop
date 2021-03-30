const verifyIdToken = require('../utils/verifyIdToken');

module.exports = (req, res, next) => {
    verifyIdToken(req.headers.authorization)
        .then(user => {
            if (!user) throw { ok: false, message: "You can't perform this action if you are not logged in!" };

            req.isLoggedIn = true;
            req.user = user;
            next();
        })
        .catch((err) => res.status(401).json(err));
}