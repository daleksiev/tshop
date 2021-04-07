const router = require('express').Router();
const userService = require('../services/userService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

router.patch('/:userId/buy/:productId', authorizeMiddleware, (req, res, next) => {
    const { userId, productId } = req.params;
    userService
        .updateOne(userId, {}, { bought: productId })
        .then(user => res.json({ ...user, ok: true }))
        .catch(err => next(err));
})

router.get('/:userId', authorizeMiddleware, (req, res, next) => {
    const { userId } = req.params;
    userService.getOneById(userId)
        .then(user => res.json(user))
        .catch(err => next(err));
})

router.patch('/:userId', authorizeMiddleware, (req, res, next) => {
    const { userId } = req.params;
    userService.updateOneById(userId, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
})
module.exports = router;