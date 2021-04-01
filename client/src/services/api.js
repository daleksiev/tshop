export const baseUrl = 'http://localhost:5000';

export const productsUrl = (category) => `${baseUrl}/products?category=${category}`;
export const productUrl = (id) => `${baseUrl}/products/${id}`;

export const authUrl = () => `${baseUrl}/auth`;

export const usersUrl = () => `${baseUrl}/users`;
export const userUrl = (userId) => `${usersUrl()}/${userId}`;
export const buyUrl = (userId, productId) => `${userUrl(userId)}/buy/${productId}`;

export const categoriesUrl = () => `${baseUrl}/categories`;
export const categoryUrl = (id) => `${baseUrl}/categories/${id}`;
