import {
    FETCH_ALL_PRODUCTS,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_ERROR,
    FETCH_ONE_PRODUCT,
    FETCH_ONE_PRODUCT_SUCCESS,
    FETCH_ONE_PRODUCT_ERROR,
} from '../actionTypes/productsActionTypes';
import { getAll, getOne } from '../services/productService';

export const fetchOneProduct = () => ({
    type: FETCH_ONE_PRODUCT,
})

export const fetchOneProductSuccess = (payload) => ({
    type: FETCH_ONE_PRODUCT_SUCCESS,
    payload,
})

export const fetchOneProductError = (payload) => ({
    type: FETCH_ONE_PRODUCT_ERROR,
    payload,
})

export const fetchOneProductAsync = (productId) => (dispatch) => {
    dispatch(fetchOneProduct());

    getOne(productId)
        .then(product => dispatch(fetchOneProductSuccess(product)))
        .catch(err => dispatch(fetchOneProductError(err)));
}

export const fetchAllProducts = () => ({
    type: FETCH_ALL_PRODUCTS,
});

export const fetchAllProductsSuccess = (payload) => ({
    type: FETCH_ALL_PRODUCTS_SUCCESS,
    payload,
})

export const fetchAllProductsError = (payload) => ({
    type: FETCH_ALL_PRODUCTS_ERROR,
    payload,
})

export const fetchAllProductsAsync = () => (dispatch) => {
    dispatch(fetchAllProducts());

    getAll()
        .then(products => dispatch(fetchAllProductsSuccess(products)))
        .catch(err => dispatch(fetchAllProductsError(err)));
}