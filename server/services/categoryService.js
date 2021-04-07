const Category = require('../models/Category');

const getAll = () => Category.find({});

const getOneById = (_id) => Category.findById(_id).populate('products');

const getOne = (filter) => Category.findOne(filter).populate('products');

const createOne = (data) => new Category(data).save();

const updateOne = (_id, data) => Category.findByIdAndUpdate(_id, { $set: data }, { new: true }).lean();

const removeOne = (_id) => Category.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
}