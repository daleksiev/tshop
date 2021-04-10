import {
    ordersUrl,
    orderUrl,
} from './api';
import requester from './requester';

const getAll = async () => requester.get(ordersUrl());
const getOne = async (id) => requester.get(orderUrl(id));
const create = async (data, token) => requester.post(ordersUrl(), data, { auth: token });
const update = async (id, data, token) => requester.patch(orderUrl(id), data, { auth: token });
const remove = async (id, token) => requester.delete(orderUrl(id), {}, { auth: token })

const orderService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default orderService;