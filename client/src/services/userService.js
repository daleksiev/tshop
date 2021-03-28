import {
    authUrl,
    usersUrl,
    buyUrl,
} from './api';
import requester from './requester';

const create = async (data) => requester.post(authUrl(), data);
const login = async (token) => requester.get(authUrl(), {}, { auth: token });
const getOne = async () => requester.get(usersUrl());
const buyProduct = async (userId, productId) => requester.patch(buyUrl(userId, productId))

const userService = {
    create,
    login,
    buyProduct,
    getOne,
}

export default userService;