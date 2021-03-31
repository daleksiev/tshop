import {
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_ERROR,
    FETCH_ALL_PRODUCTS,
    FETCH_ONE_PRODUCT_SUCCESS,
    FETCH_ONE_PRODUCT_ERROR,
    FETCH_ONE_PRODUCT,
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS
} from '../actionTypes/productsActionTypes';
import { combineReducers } from 'redux';

const currentProductInitialState = {
    _id: '',
    title: '',
    price: 0,
    imageUrl: '',
    brand: '',
};

const currentProduct = (state = currentProductInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ONE_PRODUCT_SUCCESS:
            return { ...currentProductInitialState, ...action.payload };
        case FETCH_ONE_PRODUCT_ERROR:
        case FETCH_ONE_PRODUCT:
        case CREATE_PRODUCT:
        case CREATE_PRODUCT_ERROR:
        case CREATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT:
        case UPDATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_ERROR:
        case DELETE_PRODUCT:
        case DELETE_PRODUCT_ERROR:
        case DELETE_PRODUCT_SUCCESS:
        default:
            return state;
    }
}

const productsInitialState = {
    list: [],
};

const products = (state = productsInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return { ...state, list: [...action.payload], isLoading: false };
        case FETCH_ALL_PRODUCTS_ERROR:
        case FETCH_ALL_PRODUCTS:
            return { ...state, isLoading: true };
        default:
            return state;
    }
}

export default combineReducers({
    products,
    current: currentProduct,
})

export const getProducts = (state) => state.products.products
export const getProductsIsLoading = (state) => state.products.products.isLoading
export const getProductsList = (state) => state.products.products.list
export const getCurrentProduct = (state) => state.products.current