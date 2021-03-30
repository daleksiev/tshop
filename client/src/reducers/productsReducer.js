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

const productsInitialState = {
    list: [],
    isLoading: true,
};

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
            return { ...productInitialState, ...action.payload };
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

export const products = (state = productsInitialState, action = {}) => {
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