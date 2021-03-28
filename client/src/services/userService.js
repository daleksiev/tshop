import {
    authUrl,
} from './api';
import requester from './requester';

const create = async (data) => requester.post(authUrl(), data);

const productService = {
    create,
}

export default productService;