import {
    brandsUrl,
    brandUrl,
} from './api';
import requester from './requester';
import { saveImage, deleteImage } from './storageService'
const uploadImageAndFetch = async (data, token, url, method) => {
    return saveImage(data.image, 'brands/')
        .then(imageUrl => method(url, { ...data, image: data.image.name, imageUrl }, { auth: token }));
}

const getAll = async () => requester.get(brandsUrl());
const getOne = async (id) => requester.get(brandUrl(id));
const create = async (data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, brandsUrl(), requester.post)
    }

    return requester.post(brandsUrl(), data, { auth: token });
}
const update = async (id, data, token) => {
    if (data?.image?.name) {
        return uploadImageAndFetch(data, token, brandUrl(id), requester.patch)
    }

    return requester.patch(brandUrl(id), data, { auth: token });
}
const remove = async (id, token) => {
    return getOne(id)
        .then(brand => deleteImage(brand.image, 'brands/'))
        .then(() => requester.delete(brandUrl(id), {}, { auth: token }));
}

const brandService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default brandService;