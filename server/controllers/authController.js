const router = require('express').Router();
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const userService = require('../services/userService');

router.post('/', (req, res, next) => {
    userService.createOne(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
})

router.get('/', authenticateMiddleware, (req, res) => {
    return res.json({ ok: true, user: req.user, });
})

module.exports = router;