import { combineReducers } from 'redux';
import message, * as fromMessage from "./messageReducer";
import user, * as fromUser from "./userReducer";
import products, * as fromProducts from "./productsReducer";
import categories, * as fromCategories from "./categoriesReducer";

export default combineReducers({
    message,
    user,
    products,
    categories,
})

// user selectors
export const getUser = fromUser.getUser;

// products selectors
export const getProducts = fromProducts.getProducts;
export const getProductsList = fromProducts.getProductsList;
export const getCurrentProduct = fromProducts.getCurrentProduct;
export const getProductsIsLoading = fromProducts.getProductsIsLoading;

// categories selectors
export const getCategories = fromCategories.getCategories;
export const getCategoriesList = fromCategories.getCategoriesList;
export const getCurrentCategory = fromCategories.getCurrentCategory;

// message selectors
export const getMessages = fromMessage.getMessages;
export const getMessageSuccess = fromMessage.getMessageSuccess;
export const getMessageError = fromMessage.getMessageError;
