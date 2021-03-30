const router = require('express').Router();
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const userService = require('../services/userService');

router.post('/', (req, res) => {
    userService.createOne(req.body)
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

router.get('/', authenticateMiddleware, (req, res) => {
    return res.json({ ok: true, user: req.user, });
})

module.exports = router;