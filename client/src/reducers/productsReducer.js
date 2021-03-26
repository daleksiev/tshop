import {
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_ERROR,
    FETCH_ALL_PRODUCTS,
    FETCH_ONE_PRODUCT_SUCCESS,
    FETCH_ONE_PRODUCT_ERROR,
    FETCH_ONE_PRODUCT,
} from '../actionTypes/productsActionTypes';

const productsInitialState = [];

const productInitialState = {
    _id: '',
    title: '',
    price: 0,
    imageUrl: '',
    brand: '',
};

export const product = (state = productInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ONE_PRODUCT_SUCCESS:
            return { ...state, ...action.payload };
        case FETCH_ONE_PRODUCT_ERROR:
        case FETCH_ONE_PRODUCT:
        default:
            return state;
    }
}

export const products = (state = productsInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return [...state, ...action.payload];
        case FETCH_ALL_PRODUCTS_ERROR:
        case FETCH_ALL_PRODUCTS:
        default:
            return state;
    }
}