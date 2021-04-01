import {
    brandsUrl,
    brandUrl,
} from './api';
import requester from './requester';

const getAll = async () => requester.get(brandsUrl());
const getOne = async (id) => requester.get(brandUrl(id));
const create = async (data, token) => requester.post(brandsUrl(), data, { auth: token });
const update = async (id, data, token) => requester.patch(brandUrl(id), data, { auth: token });
const remove = async (id, token) => requester.delete(brandUrl(id), {}, { auth: token });

const brandService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default brandService;