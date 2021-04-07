import {
    authUrl,
    // usersUrl,
    userUrl,
    buyUrl,
} from './api';
import firebaseService from './firebaseService';
import requester from './requester';
import { saveImage } from './storageService'
const create = async (data) => requester.post(authUrl(), data);
const login = async (token) => requester.get(authUrl(), {}, { auth: token })
const getOne = async (userId, token) => requester.get(userUrl(userId), {}, { auth: token });
const buyProduct = async (userId, productId, token) => requester.patch(buyUrl(userId, productId), {}, { auth: token });

const updateProfileImage = (id, data, token) => {
    return saveImage(data?.image, 'users/')
        .then(imageUrl => {
            return requester.patch(userUrl(id), { ...data, image: data.image.name, imageUrl }, { auth: token })
        })
    // TODO: update the photo for the firebase user
}

const updateProfileEmail = (id, data, token) => {
    return firebaseService.updateEmail(data.email)
        .then(() => requester.patch(userUrl(id), data, { auth: token }))
}

const update = (id, data, token) => {
    if (data?.image?.name) {
        return updateProfileImage(id, data, token)
    }

    if (data?.email) {
        return updateProfileEmail(id, data, token);
    }

    return requester.patch(userUrl(id), data, { auth: token })
}
const userService = {
    create,
    login,
    buyProduct,
    getOne,
    update,
}

export default userService;