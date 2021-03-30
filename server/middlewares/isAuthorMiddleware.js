const productService = require('../services/productService');

module.exports = (req, res, next) => {
    productService
        .getOneById(req.params.productId)
        .then(product => {
            if (product.author.toString() !== req.user._id.toString()) {
                throw { ok: false, message: 'You are not authorized to modify this product!' };
            }
            next();
        })
        .catch(next)
}