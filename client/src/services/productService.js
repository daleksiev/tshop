import {
    productsUrl,
    productUrl,
} from './api';
import { deleteImage, saveImage } from './storageService'
import requester from './requester';

const getAll = (categoryId) => requester.get(productsUrl(categoryId));

const getOne = async (id) => requester.get(productUrl(id))

const uploadImageAndFetch = async (data, token, url, method) => {
    return saveImage(data.image)
        .then(imageUrl => method(url, { ...data, image: data.image.name, imageUrl }, { auth: token }));
}

const create = async (data, token) => {
    if (data?.image) {
        return uploadImageAndFetch(data, token, productsUrl(), requester.post);
    }

    return requester.post(productsUrl(), { ...data }, { auth: token });
};

const update = async (id, data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, productUrl(id), requester.patch);
    }

    return requester.patch(productUrl(id), { ...data }, { auth: token })
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