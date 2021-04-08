import {
    FETCH_ALL_BRANDS_SUCCESS,
    FETCH_ALL_BRANDS_ERROR,
    FETCH_ALL_BRANDS,
    FETCH_ONE_BRAND_SUCCESS,
    FETCH_ONE_BRAND_ERROR,
    FETCH_ONE_BRAND,
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
import { combineReducers } from 'redux';

const currentBrandInitialState = {
    _id: '',
    name: '',
    imageUrl: '',
};

const currentBrand = (state = currentBrandInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ONE_BRAND_SUCCESS:
            return { ...state, ...action.payload };
        case CLEAR_ONE_BRAND:
            return { ...currentBrandInitialState };
        case FETCH_ONE_BRAND_ERROR:
        case FETCH_ONE_BRAND:
        case CREATE_BRAND:
        case CREATE_BRAND_ERROR:
        case CREATE_BRAND_SUCCESS:
        case UPDATE_BRAND:
        case UPDATE_BRAND_SUCCESS:
        case UPDATE_BRAND_ERROR:
        case DELETE_BRAND:
        case DELETE_BRAND_ERROR:
        case DELETE_BRAND_SUCCESS:
        default:
            return { ...state };
    }
}

const brandsInitialState = {
    list: [],
};

const brands = (state = brandsInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_BRANDS_SUCCESS:
            return { ...state, list: [...action.payload], isLoading: false };
        case FETCH_ALL_BRANDS_ERROR:
        case FETCH_ALL_BRANDS:
            return { ...state, isLoading: true };
        default:
            return state;
    }
}

export default combineReducers({
    brands,
    current: currentBrand,
})

export const getBrands = (state) => state.brands.brands
export const getBrandsIsLoading = (state) => state.brands.brands.isLoading
export const getBrandsList = (state) => state.brands.brands.list
export const getCurrentBrand = (state) => state.brands.current