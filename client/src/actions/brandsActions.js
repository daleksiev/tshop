import {
    FETCH_ALL_BRANDS,
    FETCH_ALL_BRANDS_SUCCESS,
    FETCH_ALL_BRANDS_ERROR,
    FETCH_ONE_BRAND,
    FETCH_ONE_BRAND_SUCCESS,
    FETCH_ONE_BRAND_ERROR,
    CREATE_BRAND,
    CREATE_BRAND_ERROR,
    CREATE_BRAND_SUCCESS,
    UPDATE_BRAND,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_ERROR,
    DELETE_BRAND,
    DELETE_BRAND_ERROR,
    DELETE_BRAND_SUCCESS,
    CLEAR_ONE_BRAND,
} from '../actionTypes/brandsActionTypes';
import brandService from '../services/brandService';

export const clearOneBrand = () => ({
    type: CLEAR_ONE_BRAND,
})

// fetch one brand
export const fetchOneBrand = () => ({
    type: FETCH_ONE_BRAND,
})

export const fetchOneBrandSuccess = (payload) => ({
    type: FETCH_ONE_BRAND_SUCCESS,
    payload,
})

export const fetchOneBrandError = (payload) => ({
    type: FETCH_ONE_BRAND_ERROR,
    payload,
})

export const fetchOneBrandAsync = (brandId) => (dispatch) => {
    dispatch(fetchOneBrand());

    return brandService.getOne(brandId)
        .then(brand => dispatch(fetchOneBrandSuccess(brand)))
        .catch(err => dispatch(fetchOneBrandError(err)));
}

// fetch all brands
export const fetchAllBrandsPending = () => ({
    type: FETCH_ALL_BRANDS,
});

export const fetchAllBrandsSuccess = (payload) => ({
    type: FETCH_ALL_BRANDS_SUCCESS,
    payload,
})

export const fetchAllBrandsError = (payload) => ({
    type: FETCH_ALL_BRANDS_ERROR,
    payload,
})

export const fetchAllBrandsAsync = () => (dispatch) => {
    dispatch(fetchAllBrandsPending());

    brandService.getAll()
        .then(brands => dispatch(fetchAllBrandsSuccess(brands)))
        .catch(err => dispatch(fetchAllBrandsError(err)));
}

// create brand
export const createBrand = () => ({
    type: CREATE_BRAND,
})

export const createBrandSuccess = (payload) => ({
    type: CREATE_BRAND_SUCCESS,
    payload,
})

export const createBrandError = (payload) => ({
    type: CREATE_BRAND_ERROR,
    payload,
})

export const createBrandAsync = (data, token) => async (dispatch) => {
    dispatch(createBrand());

    return brandService.create(data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }

            return dispatch(createBrandSuccess(res))
        })
}

// update brand
export const updateBrand = () => ({
    type: UPDATE_BRAND,
})

export const updateBrandSuccess = (payload) => ({
    type: UPDATE_BRAND_SUCCESS,
    payload,
})

export const updateBrandError = (payload) => ({
    type: UPDATE_BRAND_ERROR,
    payload,
})

export const updateBrandAsync = (id, data, token) => async (dispatch) => {
    dispatch(updateBrand());

    return brandService.update(id, data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            dispatch(updateBrandSuccess(res))
        })
}

//delete brand
export const deleteBrand = () => ({
    type: DELETE_BRAND,
})

export const deleteBrandSuccess = () => ({
    type: DELETE_BRAND_SUCCESS,
})

export const deleteBrandError = (payload) => ({
    type: DELETE_BRAND_ERROR,
    payload,
})

export const deleteBrandAsync = (id, token) => async (dispatch) => {
    dispatch(deleteBrand());

    return brandService.remove(id, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            return dispatch(deleteBrandSuccess(res))
        });
}