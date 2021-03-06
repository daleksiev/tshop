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
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS,
    CLEAR_ONE_PRODUCT,
} from '../actionTypes/productsActionTypes';
import productService from '../services/productService';

export const clearOneProduct = () => ({
    type: CLEAR_ONE_PRODUCT,
})

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

    return productService.getOne(productId)
        .then(product => {
            dispatch(fetchOneProductSuccess(product))
            return product;
        })
        .catch(err => dispatch(fetchOneProductError(err)));
}

// fetch all products
export const fetchAllProductsPending = () => ({
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

export const fetchAllProductsAsync = (categoryId) => (dispatch) => {
    dispatch(fetchAllProductsPending());

    productService.getAll(categoryId)
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

export const createProductAsync = (data, token) => async (dispatch) => {
    dispatch(createProduct());

    return productService.create(data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }

            return dispatch(createProductSuccess(res))
        })
}

// update product
export const updateProduct = () => ({
    type: UPDATE_PRODUCT,
})

export const updateProductSuccess = (payload) => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload,
})

export const updateProductError = (payload) => ({
    type: UPDATE_PRODUCT_ERROR,
    payload,
})

export const updateProductAsync = (id, data, token) => async (dispatch) => {
    dispatch(updateProduct());

    return productService.update(id, data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            dispatch(updateProductSuccess(res))
        })
}

//delete product
export const deleteProduct = () => ({
    type: DELETE_PRODUCT,
})

export const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS,
})

export const deleteProductError = (payload) => ({
    type: DELETE_PRODUCT_ERROR,
    payload,
})

export const deleteProductAsync = (id, token) => async (dispatch) => {
    dispatch(deleteProduct());

    return productService.remove(id, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            return dispatch(deleteProductSuccess(res))
        });
}