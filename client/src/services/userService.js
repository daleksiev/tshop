import {
    authUrl,
    // usersUrl,
    userUrl,
    buyUrl,
} from './api';
import requester from './requester';
import { saveImage } from './storageService'
const create = async (data) => requester.post(authUrl(), data);
const login = async (token) => requester.get(authUrl(), {}, { auth: token })
const getOne = async (userId, token) => requester.get(userUrl(userId), {}, { auth: token });
const buyProduct = async (userId, productId, token) => requester.patch(buyUrl(userId, productId), {}, { auth: token })
const update = (id, data, token) => {
    return saveImage(data?.image, 'users/')
        .then(imageUrl => {
            return requester.patch(userUrl(id), { ...data, image: data.image.name, imageUrl }, { auth: token })
        })
}
const userService = {
    create,
    login,
    buyProduct,
    getOne,
    update,
}

export default userService;