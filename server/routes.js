const router = require('express').Router();
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');

router.use('/products', productController);
router.use('/auth', authController);

module.exports = router;