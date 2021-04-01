import {
    productsUrl,
    productUrl,
} from './api';
import requester from './requester';

const getAll = async (categoryId) => requester.get(productsUrl(categoryId));
const getOne = async (id) => requester.get(productUrl(id));
const create = async (data, token) => requester.post(productsUrl(), data, { auth: token });
const update = async (id, data, token) => requester.patch(productUrl(id), data, { auth: token });
const remove = async (id, token) => requester.delete(productUrl(id), {}, { auth: token });

const productService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default productService;