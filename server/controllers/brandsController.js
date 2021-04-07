const router = require('express').Router();
const brandService = require('../services/brandService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

router.get('/', (req, res, next) => {
    brandService.getAll()
        .then(brands => res.json(brands))
        .catch(err => next(err));
})

router.get('/:brandId', (req, res, next) => {
    brandService.getOneById(req.params.brandId)
        .then(brand => res.json(brand))
        .catch(err => next(err));
})

router.post('/', authorizeMiddleware, isAdminMiddleware, (req, res, next) => {
    brandService.createOne(req.body)
        .then(brand => res.json({ ...brand, ok: true }))
        .catch(err => next(err));
})

router.patch('/:brandId', authorizeMiddleware, isAdminMiddleware, (req, res, next) => {
    brandService.updateOne(req.params.brandId, req.body)
        .then(brand => res.json({ ...brand, ok: true }))
        .catch(err => next(err));
})

router.delete('/:brandId', authorizeMiddleware, isAdminMiddleware, (req, res, next) => {
    brandService.removeOne(req.params.brandId)
        .then(response => {
            res.send({ ...response, ok: true })
        })
        .catch(err => next(err));
})

module.exports = router;