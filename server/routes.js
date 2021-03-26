const router = require('express').Router();
const productController = require('./controllers/productController');

router.use('/products', productController);

module.exports = router;