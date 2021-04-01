const router = require('express').Router();
const productsController = require('./controllers/productsController');
const categoriesController = require('./controllers/categoriesController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');
const authorizeMiddleware = require('./middlewares/authorizeMiddleware');

router.use('/products', productsController);
router.use('/auth', authController);
router.use('/users', authorizeMiddleware, usersController);
router.use('/categories', categoriesController);

module.exports = router;