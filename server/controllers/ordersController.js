const router = require('express').Router();
const orderService = require('../services/orderService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

router.get('/', authorizeMiddleware, isAdminMiddleware, (req, res, next) => {
    orderService.getAll()
        .then(orders => res.json(orders))
        .catch(err => next(err));
})

router.get('/:orderId', authorizeMiddleware, (req, res, next) => {
    orderService.getOneById(req.params.orderId)
        .then(order => res.json(order))
        .catch(err => next(err));
})

router.post('/', authorizeMiddleware, (req, res, next) => {
    orderService.createOne(req.body)
        .then(order => res.json({ ...order, ok: true }))
        .catch(err => next(err));
})

router.patch('/:orderId', authorizeMiddleware, (req, res, next) => {
    orderService.updateOne(req.params.orderId, req.body)
        .then(order => res.json({ ...order, ok: true }))
        .catch(err => next(err));
})

router.delete('/:orderId', authorizeMiddleware, (req, res, next) => {
    orderService.removeOne(req.params.orderId)
        .then(response => {
            res.send({ ...response, ok: true })
        })
        .catch(err => next(err));
})

module.exports = router;