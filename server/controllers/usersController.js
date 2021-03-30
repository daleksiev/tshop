const router = require('express').Router();
const userService = require('../services/userService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

router.patch('/:userId/buy/:productId', authorizeMiddleware, (req, res, next) => {
    const { userId, productId } = req.params;
    userService
        .updateOne(userId, {}, { bought: productId })
        .populate('bought')
        .then(user => res.json(user))
        .catch(err => next(err));
})


router.get('/:userId', authorizeMiddleware, (req, res, nect) => {
    const { userId } = req.params;
    userService.getOneById(userId)
        .then(user => res.json(user))
        .catch(err => next(err));
})
module.exports = router;