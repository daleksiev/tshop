const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => console.log(err));
})

router.get('/:productId', (req, res) => {
    productService.getOneById(req.params.productId)
        .then(product => res.json(product))
        .catch(err => console.log(err));
})

router.post('/', (req, res) => {
    productService.createOne(req.body)
        .then(product => res.json(product))
        .catch(err => console.log(err));
})

router.patch('/:productId', (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(product => res.json(product))
        .catch(err => console.log(err));
})

router.delete('/:productId', (req, res) => {
    productService.removeOne(req.params.productId)
        .then(response => res.send(response))
        .catch(err => console.log(err));
})

module.exports = router;