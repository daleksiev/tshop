const User = require('../models/User');

const getAll = () => User.find({});

const getOneById = (_id) => User.findById(_id);

const getOne = (filter) => User.findOne(filter).populate('favourites').lean();

const createOne = (data) => new User(data).save();

const updateOne = (_id, data, $push, $pull) => {
    const updateOptions = { $set: data };

    if ($push?.favourites) {
        updateOptions.$push = $push;
    }

    if ($pull?.favourites) {
        updateOptions.$pull = $pull;
    }

    return User.findByIdAndUpdate(_id, updateOptions, { new: true })
        .populate('favourites')
        .lean();
}

const updateOneById = (_id, data) => {
    return User.updateOne({ _id }, data, { new: true })
        .then(res => {
            if (!res.ok) throw res;
            return getOne({ _id })
        })
}

const updateOneByFilter = (filter, data, push) => User
    .findOneAndUpdate(filter, { $set: data, $push: push, }, { new: true })
    .populate('favourites');

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