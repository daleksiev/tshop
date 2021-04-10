import {
    ordersUrl,
    orderUrl,
} from './api';
import requester from './requester';
import { saveImage, deleteImage } from './storageService'
const uploadImageAndFetch = async (data, token, url, method) => {
    return saveImage(data.image, 'orders/')
        .then(imageUrl => method(url, { ...data, image: data.image.name, imageUrl }, { auth: token }));
}

const getAll = async () => requester.get(ordersUrl());
const getOne = async (id) => requester.get(orderUrl(id));
const create = async (data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, ordersUrl(), requester.post)
    }

    return requester.post(ordersUrl(), data, { auth: token });
}
const update = async (id, data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, orderUrl(id), requester.patch)
    }

    return requester.patch(orderUrl(id), data, { auth: token });
}
const remove = async (id, token) => {
    return getOne(id)
        .then(order => deleteImage(order.image, 'orders/'))
        .then(() => requester.delete(orderUrl(id), {}, { auth: token }));
}

const orderService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default orderService;