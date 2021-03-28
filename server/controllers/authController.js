const router = require('express').Router();
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');
const userService = require('../services/userService');

router.post('/', (req, res) => {
    userService.createOne(req.body)
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

router.get('/', firebaseAuthMiddleware, (req, res) => {
    res.json({ ok: true, token: req.token });
})

module.exports = router;