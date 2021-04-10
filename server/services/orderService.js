const Order = require('../models/Order');

const getAll = () => Order.find({});

const getAllByUserId = (userId) => Order.find({ user: userId });

const getOneById = (_id) => Order.findById(_id);

const getOne = (filter) => Order.findOne(filter);

const createOne = (data) => new Order(data).save();

const updateOne = (_id, data) => Order.findByIdAndUpdate(_id, { $set: data }, { new: true }).lean();

const removeOne = (_id) => Order.findByIdAndDelete(_id);

module.exports = {
    getAll,
    getOneById,
    getOne,
    updateOne,
    removeOne,
    createOne,
    getAllByUserId,
}