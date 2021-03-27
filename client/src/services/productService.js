import {
    productsUrl,
    productUrl,
} from './api';
import requester from './requester';

const getAll = async () => requester.get(productsUrl());
const getOne = async (id) => requester.get(productUrl(id));
const create = async (data) => requester.post(productsUrl(), data);
const remove = async (id) => requester.delete(productUrl(id));

const productService = {
    getAll,
    getOne,
    create,
    remove,
}

export default productService;