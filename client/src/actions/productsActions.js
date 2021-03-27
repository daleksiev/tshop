import {
    FETCH_ALL_PRODUCTS,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_ERROR,
    FETCH_ONE_PRODUCT,
    FETCH_ONE_PRODUCT_SUCCESS,
    FETCH_ONE_PRODUCT_ERROR,
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,
} from '../actionTypes/productsActionTypes';
import productService from '../services/productService';


// fetch one product
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

    productService.getOne(productId)
        .then(product => dispatch(fetchOneProductSuccess(product)))
        .catch(err => dispatch(fetchOneProductError(err)));
}

// fetch all products
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

    productService.getAll()
        .then(products => dispatch(fetchAllProductsSuccess(products)))
        .catch(err => dispatch(fetchAllProductsError(err)));
}

// create product
export const createProduct = () => ({
    type: CREATE_PRODUCT,
})

export const createProductSuccess = (payload) => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload,
})

export const createProductError = (payload) => ({
    type: CREATE_PRODUCT_ERROR,
    payload,
})

export const createProductAsync = (data) => async (dispatch) => {
    dispatch(createProduct());

    productService.create(data)
        .then(product => dispatch(createProductSuccess(product)))
        .catch(err => dispatch(createProductError(err)));
}