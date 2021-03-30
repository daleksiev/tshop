import {
    authUrl,
    // usersUrl,
    userUrl,
    buyUrl,
} from './api';
import requester from './requester';

const create = async (data) => requester.post(authUrl(), data);
const login = async (token) => requester.get(authUrl(), {}, { auth: token });
const getOne = async (userId) => requester.get(userUrl(userId));
const buyProduct = async (userId, productId) => requester.patch(buyUrl(userId, productId))

const userService = {
    create,
    login,
    buyProduct,
    getOne,
}

export default userService;