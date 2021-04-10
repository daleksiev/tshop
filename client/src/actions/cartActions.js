import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_PRODUCT_COUNT,
    INCREASE_COUNT,
    DECREASE_COUNT,
    CLEAR_CART,
} from '../actionTypes/cartActionTypes';

export const clearCart = () => ({
    type: CLEAR_CART,
})

export const changeProductCount = (productId, count) => ({
    type: CHANGE_PRODUCT_COUNT,
    productId,
    payload: Number(count),
})

export const increaseProductCount = (productId) => ({
    type: INCREASE_COUNT,
    productId,
    payload: {},
})

export const decreaseProductCount = (productId) => ({
    type: DECREASE_COUNT,
    productId,
    payload: {},
})

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