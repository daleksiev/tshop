const router = require('express').Router();
const categoryService = require('../services/categoryService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const isAuthorMiddleware = require('../middlewares/isAuthorMiddleware');

router.get('/', (req, res, next) => {
    categoryService.getAll()
        .then(categories => res.json(categories))
        .catch(err => next(err));
})

router.get('/:categoryId', (req, res, next) => {
    categoryService.getOneById(req.params.categoryId)
        .then(category => res.json(category))
        .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    categoryService.createOne(req.body)
        .then(category => res.json({ ...category, ok: true }))
        .catch(err => next(err));
})

router.patch('/:categoryId', (req, res, next) => {
    categoryService.updateOne(req.params.categoryId, req.body)
        .then(category => res.json({ ...category, ok: true }))
        .catch(err => next(err));
})

router.delete('/:categoryId', (req, res, next) => {
    categoryService.removeOne(req.params.categoryId)
        .then(response => {
            res.send({ ...response, ok: true })
        })
        .catch(err => next(err));
})

module.exports = router;