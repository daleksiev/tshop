import {
    FETCH_ALL_CATEGORIES,
    FETCH_ALL_CATEGORIES_SUCCESS,
    FETCH_ALL_CATEGORIES_ERROR,
    FETCH_ONE_CATEGORY,
    FETCH_ONE_CATEGORY_SUCCESS,
    FETCH_ONE_CATEGORY_ERROR,
    CREATE_CATEGORY,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
} from '../actionTypes/categoriesActionTypes';
import categoryService from '../services/categoryService';

// fetch one product
export const fetchOneCategory = () => ({
    type: FETCH_ONE_CATEGORY,
})

export const fetchOneCategorySuccess = (payload) => ({
    type: FETCH_ONE_CATEGORY_SUCCESS,
    payload,
})

export const fetchOneCategoryError = (payload) => ({
    type: FETCH_ONE_CATEGORY_ERROR,
    payload,
})

export const fetchOneCategoryAsync = (productId) => (dispatch) => {
    dispatch(fetchOneCategory());

    categoryService.getOne(productId)
        .then(product => dispatch(fetchOneCategorySuccess(product)))
        .catch(err => dispatch(fetchOneCategoryError(err)));
}

// fetch all products
export const fetchAllCategoriesPending = () => ({
    type: FETCH_ALL_CATEGORIES,
});

export const fetchAllCategoriesSuccess = (payload) => ({
    type: FETCH_ALL_CATEGORIES_SUCCESS,
    payload,
})

export const fetchAllCategoriesError = (payload) => ({
    type: FETCH_ALL_CATEGORIES_ERROR,
    payload,
})

export const fetchAllCategoriesAsync = () => (dispatch) => {
    dispatch(fetchAllCategoriesPending());

    categoryService.getAll()
        .then(categories => dispatch(fetchAllCategoriesSuccess(categories)))
        .catch(err => dispatch(fetchAllCategoriesError(err)));
}

// create product
export const createCategory = () => ({
    type: CREATE_CATEGORY,
})

export const createCategorySuccess = (payload) => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload,
})

export const createCategoryError = (payload) => ({
    type: CREATE_CATEGORY_ERROR,
    payload,
})

export const createCategoryAsync = (data, token) => async (dispatch) => {
    dispatch(createCategory());

    return categoryService.create(data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }

            return dispatch(createCategorySuccess(res))
        })
}

// update product
export const updateCategory = () => ({
    type: UPDATE_CATEGORY,
})

export const updateCategorySuccess = (payload) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload,
})

export const updateCategoryError = (payload) => ({
    type: UPDATE_CATEGORY_ERROR,
    payload,
})

export const updateCategoryAsync = (id, data, token) => async (dispatch) => {
    dispatch(updateCategory());

    return categoryService.update(id, data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            dispatch(updateCategorySuccess(res))
        })
}

//delete product
export const deleteCategory = () => ({
    type: DELETE_CATEGORY,
})

export const deleteCategorySuccess = () => ({
    type: DELETE_CATEGORY_SUCCESS,
})

export const deleteCategoryError = (payload) => ({
    type: DELETE_CATEGORY_ERROR,
    payload,
})

export const deleteCategoryAsync = (id, token) => async (dispatch) => {
    dispatch(deleteCategory());

    return categoryService.remove(id, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            return dispatch(deleteCategorySuccess(res))
        });
}