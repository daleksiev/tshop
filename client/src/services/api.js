import config from '../config';
export const { apiUrl } = config;

export const productsUrl = (category) => `${apiUrl}/products?category=${category}`;
export const productUrl = (id) => `${apiUrl}/products/${id}`;

export const authUrl = () => `${apiUrl}/auth`;

export const usersUrl = () => `${apiUrl}/users`;
export const userUrl = (userId) => `${usersUrl()}/${userId}`;
export const favouritesUrl = (userId, productId) => `${userUrl(userId)}/favourites/${productId}`;

export const categoriesUrl = () => `${apiUrl}/categories`;
export const categoryUrl = (id) => `${categoriesUrl()}/${id}`;

export const brandsUrl = () => `${apiUrl}/brands`;
export const brandUrl = (id) => `${brandsUrl()}/${id}`;

export const ordersUrl = () => `${apiUrl}/orders`;
export const orderUrl = (id) => `${ordersUrl()}/${id}`;
export const userOrdersUrl = (userId) => `${userUrl(userId)}/orders`
