const Brand = require('../models/Brand');

const getAll = () => Brand.find({});

const getOneById = (_id) => Brand.findById(_id);

const getOne = (filter) => Brand.findOne(filter);

const createOne = (data) => new Brand(data).save();

const updateOne = (_id, data) => Brand.findByIdAndUpdate(_id, { $set: data }, { new: true });

const removeOne = (_id) => Brand.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
}