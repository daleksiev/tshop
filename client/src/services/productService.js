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
        .then(imageUrl => {
            data.image = data.image.name;
            data.imageUrl = imageUrl;
            return requester.post(productsUrl(), data, { auth: token })
        });
};

const update = async (id, data, token) => {
    return saveImage(data.image)
        .then(imageUrl => {
            data.image = data.image.name;
            data.imageUrl = imageUrl;
            return requester.patch(productUrl(id), data, { auth: token });
        });
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