const router = require('express').Router();
const productsController = require('./controllers/productsController');
const categoriesController = require('./controllers/categoriesController');
const brandsController = require('./controllers/brandsController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');
const ordersController = require('./controllers/ordersController');
const authorizeMiddleware = require('./middlewares/authorizeMiddleware');

router.use('/products', productsController);
router.use('/auth', authController);
router.use('/users', authorizeMiddleware, usersController);
router.use('/categories', categoriesController);
router.use('/brands', brandsController);
router.use('/orders', ordersController);

module.exports = router;