import { productsUrl } from './api';
import requester from './requester';

export const getAll = async () => requester.get(productsUrl());