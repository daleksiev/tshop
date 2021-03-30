const router = require('express').Router();
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');
const authorizeMiddleware = require('./middlewares/authorizeMiddleware');

router.use('/products', productController);
router.use('/auth', authController);
router.use('/users', authorizeMiddleware, usersController);

module.exports = router;