import {
    authUrl,
} from './api';
import requester from './requester';

const create = async (data) => requester.post(authUrl(), data);
const login = async (token) => requester.get(authUrl(), {}, { auth: token });
const productService = {
    create,
    login,
}

export default productService;