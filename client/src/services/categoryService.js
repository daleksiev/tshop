import {
    categoriesUrl,
    categoryUrl,
} from './api';
import requester from './requester';

const getAll = async () => requester.get(categoriesUrl());
const getOne = async (id) => requester.get(categoryUrl(id));
const create = async (data, token) => requester.post(categoriesUrl(), data, { auth: token });
const update = async (id, data, token) => requester.patch(categoryUrl(id), data, { auth: token });
const remove = async (id, token) => requester.delete(categoryUrl(id), {}, { auth: token });

const categoryService = {
    getAll,
    getOne,
    create,
    update,
    remove,
}

export default categoryService;