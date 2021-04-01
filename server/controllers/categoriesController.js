const router = require('express').Router();
const categoryService = require('../services/categoryService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const isAuthorMiddleware = require('../middlewares/isAuthorMiddleware');

router.get('/', (req, res, next) => {
    categoryService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
})

router.get('/:productId', (req, res, next) => {
    categoryService.getOneById(req.params.productId)
        .then(product => res.json(product))
        .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    categoryService.createOne(req.body)
        .then(product => res.json({ ...product, ok: true }))
        .catch(err => next(err));
})

router.patch('/:productId', (req, res, next) => {
    categoryService.updateOne(req.params.productId, req.body)
        .then(product => res.json({ ...product, ok: true }))
        .catch(err => next(err));
})

router.delete('/:productId', (req, res, next) => {
    categoryService.removeOne(req.params.productId)
        .then(response => {
            res.send({ ...response, ok: true })
        })
        .catch(err => next(err));
})

module.exports = router;