const router = require('express').Router();
const userService = require('../services/userService');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

router.patch('/:userId/buy/:productId', authorizeMiddleware, (req, res) => {
    const { userId, productId } = req.params;
    userService
        .updateOne(userId, {}, { bought: productId })
        .populate('bought')
        .then(user => res.json(user))
        .catch(err => console.log(err));
})


router.get('/:userId', authorizeMiddleware, (req, res) => {
    const { userId } = req.params;
    userService.getOneById(userId)
        .then(user => res.json(user))
        .catch(err => console.log(err));
})
module.exports = router;