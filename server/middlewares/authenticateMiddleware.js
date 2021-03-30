const verifyIdToken = require('../utils/verifyIdToken');

module.exports = (req, res, next) => {
    verifyIdToken(req.headers.authorization)
        .then(user => {
            if (!user) throw { ok: false, message: 'No user has been found!' };

            req.isLoggedIn = true;
            req.user = user;
            next();
        })
        .catch((err) => res.status(404).json(err));
}