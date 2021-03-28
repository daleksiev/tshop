const router = require('express').Router();
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');

router.use('/products', productController);
router.use('/auth', authController);
router.use('/users', usersController);

module.exports = router;