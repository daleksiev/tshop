import {
    productsUrl,
    productUrl,
} from './api';
import requester from './requester';

const getAll = async () => requester.get(productsUrl());
const getOne = async (id) => requester.get(productUrl(id));
const create = async (data) => requester.post(productsUrl(), data);

const productService = {
    getAll,
    getOne,
    create,
}

export default productService;