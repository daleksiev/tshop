const User = require('../models/User');

const getAll = () => User.find({});

const getOneById = (_id) => User.findById(_id);

const getOne = (filter) => User.findOne(filter);

const createOne = (data) => new User(data).save();

const updateOne = (_id, data) => User.findByIdAndUpdate(_id, { $set: data }, { new: true });

const removeOne = (_id) => User.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
}