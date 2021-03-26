const router = require('express').Router();

router.use('/', (req, res) => {
    res.send('Hello there!');
})

module.exports = router;