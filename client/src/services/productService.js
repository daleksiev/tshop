import {
    productsUrl,
    productUrl,
} from './api';
import requester from './requester';

export const getAll = async () => requester.get(productsUrl());
export const getOne = async (id) => requester.get(productUrl(id));