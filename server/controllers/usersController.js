const router = require('express').Router();
const userService = require('../services/userService');

router.patch('/:userId/buy/:productId', (req, res) => {
    const { userId, productId } = req.params;
    userService.updateOne(userId, {}, { bought: productId })
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

module.exports = router;