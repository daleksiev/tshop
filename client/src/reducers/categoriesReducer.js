import {
    FETCH_ALL_CATEGORIES_SUCCESS,
    FETCH_ALL_CATEGORIES_ERROR,
    FETCH_ALL_CATEGORIES,
    FETCH_ONE_CATEGORY_SUCCESS,
    FETCH_ONE_CATEGORY_ERROR,
    FETCH_ONE_CATEGORY,
    CREATE_CATEGORY,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS
} from '../actionTypes/categoriesActionTypes';
import { combineReducers } from 'redux';

const currentCategoryInitialState = {
    _id: '',
    name: '',
    imageUrl: '',
    products: [],
};

const currentCategory = (state = currentCategoryInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ONE_CATEGORY_SUCCESS:
        case FETCH_ONE_CATEGORY_ERROR:
        case FETCH_ONE_CATEGORY:
        case UPDATE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY:
        case UPDATE_CATEGORY_ERROR:
            return { ...currentCategoryInitialState, ...action.payload };
        case CREATE_CATEGORY:
        case CREATE_CATEGORY_ERROR:
        case CREATE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY:
        case DELETE_CATEGORY_ERROR:
        case DELETE_CATEGORY_SUCCESS:
        default:
            return state;
    }
}

const categoriesInitialState = {
    list: [],
    isLoading: false,
}

const categories = (state = categoriesInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES_SUCCESS:
            return { ...state, list: [...action.payload], isLoading: false };
        case FETCH_ALL_CATEGORIES:
            return { ...state, isLoading: true };
        case FETCH_ALL_CATEGORIES_ERROR:
        default:
            return { ...state };
    }
}

export default combineReducers({
    categories,
    current: currentCategory,
})

export const getCategories = (state) => state.categories
export const getCategoriesList = (state) => state.categories.categories.list
export const getCategoriesIsLoading = (state) => state.categories.categories.isLoading
export const getCurrentCategory = (state) => state.categories.current