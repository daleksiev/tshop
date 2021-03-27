const Product = require('../models/Product');

const getAll = () => Product.find({});

const getOneById = (_id) => Product.findById(_id);

const getOne = (filter) => Product.findOne(filter);

const createOne = (data) => new Product(data).save();

const updateOne = (_id, data) => Product.findByIdAndUpdate(_id, { $set: data }, { new: true });

const removeOne = (_id) => Product.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
}