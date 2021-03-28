export const baseUrl = 'http://localhost:5000';

export const productsUrl = () => `${baseUrl}/products`;
export const productUrl = (id) => `${baseUrl}/products/${id}`;

export const authUrl = () => `${baseUrl}/auth`;

export const usersUrl = () => `${baseUrl}/users`;
export const buyUrl = (userId, productId) => `${usersUrl()}/${userId}/buy/${productId}`;
