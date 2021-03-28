const router = require('express').Router();
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');
const userService = require('../services/userService');

router.post('/', (req, res) => {
    userService.createOne(req.body)
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

router.get('/', firebaseAuthMiddleware, (req, res) => {
    if (req.isLoggedIn) {
        return res.json({ ok: true });
    }

    return res.json({ ok: false });
})

module.exports = router;