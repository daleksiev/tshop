import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../actionTypes/cartActionTypes';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: {
        ...product,
        count: 1,
    }
})

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: {},
    productId,
})