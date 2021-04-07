import {
    categoriesUrl,
    categoryUrl,
} from './api';
import { saveImage } from './storageService'
import requester from './requester';

const uploadImageAndFetch = async (data, token, url, method) => {
    return saveImage(data.image)
        .then(imageUrl => method(url, { ...data, image: data.image.name, imageUrl }, { auth: token }));
}

const getAll = async () => requester.get(categoriesUrl());
const getOne = async (id) => requester.get(categoryUrl(id));
const create = async (data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, categoriesUrl(), requester.post)
    }

    return requester.post(categoriesUrl(), data, { auth: token });
}
const update = async (id, data, token) => requester.patch(categoryUrl(id), data, { auth: token });
const remove = async (id, token) => requester.delete(categoryUrl(id), {}, { auth: token });

const categoryService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default categoryService;