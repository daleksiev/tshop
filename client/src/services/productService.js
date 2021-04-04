import {
    productsUrl,
    productUrl,
} from './api';
import { deleteImage, saveImage } from './storageService'
import requester from './requester';

const getAll = (categoryId) => requester.get(productsUrl(categoryId));

const getOne = async (id) => requester.get(productUrl(id))

const create = async (data, token) => {
    return saveImage(data.image)
        .then(imageUrl => requester.post(productsUrl(), { ...data, image: data.image.name, imageUrl }, { auth: token }));
};

const update = async (id, data, token) => {
    return saveImage(data.image)
        .then(imageUrl => requester.patch(productUrl(id), { ...data, image: data.image.name, imageUrl }, { auth: token }))
}
const remove = async (id, token) => {
    return getOne(id)
        .then(product => deleteImage(product.image))
        .then(() => requester.delete(productUrl(id), {}, { auth: token }))
}

const productService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default productService;