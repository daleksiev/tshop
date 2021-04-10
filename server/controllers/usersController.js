const router = require('express').Router();
const orderService = require('../services/orderService');
const userService = require('../services/userService');

router.post('/:userId/favourites/:productId', (req, res, next) => {
    const { userId, productId } = req.params;
    userService
        .updateOne(userId, {}, { favourites: productId })
        .then(user => res.json({ ...user, ok: true }))
        .catch(err => next(err));
})

router.delete('/:userId/favourites/:productId', (req, res, next) => {
    const { userId, productId } = req.params;
    userService
        .updateOne(userId, {}, {}, { favourites: productId })
        .then(user => res.json({ ...user, ok: true }))
        .catch(err => next(err));
})

router.get('/:userId', (req, res, next) => {
    const { userId } = req.params;
    userService.getOneById(userId)
        .then(user => res.json(user))
        .catch(err => next(err));
})

router.patch('/:userId', (req, res, next) => {
    const { userId } = req.params;
    userService.updateOneById(userId, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
})
router.get('/:userId/orders', (req, res, next) => {
    const { userId } = req.params;
    orderService.getAllByUserId(userId)
        .then(orders => res.json(orders))
        .catch(err => next(err));
})
module.exports = router;