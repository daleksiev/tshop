import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
} from '../actionTypes/productsActionTypes';
import { getAll } from '../services/productService';

export const fetchProducts = () => ({
    type: FETCH_PRODUCTS
});

export const fetchProductsSuccess = (payload) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload,
})

export const fetchProductsError = (payload) => ({
    type: FETCH_PRODUCTS_ERROR,
    payload,
})

export const fetchProductsAsync = () => (dispatch) => {
    dispatch(fetchProducts());

    getAll()
        .then(products => dispatch(fetchProductsSuccess(products)))
        .catch(err => dispatch(fetchProductsError(err)));
}