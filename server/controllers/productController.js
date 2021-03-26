const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => console.log(err));
})

router.post('/', (req, res) => {
    productService.createOne(req.body)
        .then(response => res.json(response))
        .catch(err => console.log(err));
})

router.patch('/', (req, res) => {
    res.send('Hello there!');
})

router.delete('/', (req, res) => {
    res.send('Hello there!');
})

module.exports = router;