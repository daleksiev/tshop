const router = require('express').Router();
const productService = require('../services/productService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const isAuthorMiddleware = require('../middlewares/isAuthorMiddleware');

router.get('/', (req, res, next) => {
    productService.getAll(req.query)
        .then(products => res.json(products))
        .catch(err => next(err));
})

router.get('/:productId', (req, res, next) => {
    productService.getOneById(req.params.productId)
        .then(product => res.json(product))
        .catch(err => next(err));
})

router.post('/', authorizeMiddleware, (req, res, next) => {
    productService.createOne(req.body)
        .then(product => res.json({ ...product, ok: true }))
        .catch(err => next(err));
})

router.patch('/:productId', authorizeMiddleware, isAuthorMiddleware, (req, res, next) => {
    productService.updateOne(req.params.productId, req.body)
        .then(product => res.json({ ...product, ok: true }))
        .catch(err => next(err));
})

router.delete('/:productId', authorizeMiddleware, isAuthorMiddleware, (req, res, next) => {
    productService.removeOne(req.params.productId)
        .then(response => {
            res.send({ ...response, ok: true })
        })
        .catch(err => next(err));
})

module.exports = router;