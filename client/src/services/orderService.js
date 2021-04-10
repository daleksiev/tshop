import {
    ordersUrl,
    orderUrl,
    userOrdersUrl,
} from './api';
import requester from './requester';

const getAll = async (token, role, userId) => {
    if (role === 'admin') {
        return requester.get(ordersUrl(), undefined, { auth: token });
    }

    return requester.get(userOrdersUrl(userId), undefined, { auth: token });
}
const getOne = async (id, token) => requester.get(orderUrl(id), undefined, { auth: token });
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