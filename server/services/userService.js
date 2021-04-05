const User = require('../models/User');

const getAll = () => User.find({});

const getOneById = (_id) => User.findById(_id);

const getOne = (filter) => User.findOne(filter).populate('bought').lean();

const createOne = (data) => new User(data).save();

const updateOne = (_id, data, push) => User.findByIdAndUpdate(_id, { $set: data, $push: push, }, { new: true })
    .populate('bought')
    .lean();

const updateOneById = (_id, data) => {
    return User.updateOne({ _id }, data, { new: true })
        .then(res => {
            if (!res.ok) throw res;
            return getOne({ _id })
        })
}

const updateOneByFilter = (filter, data, push) => User
    .findOneAndUpdate(filter, { $set: data, $push: push, }, { new: true })
    .populate('bought');

const removeOne = (_id) => User.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
    updateOneByFilter,
    updateOneById,
}