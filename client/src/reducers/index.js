import { combineReducers } from 'redux';
import message, * as fromMessage from "./messageReducer";
import user, * as fromUser from "./userReducer";
import products, * as fromProducts from "./productsReducer";
import categories, * as fromCategories from "./categoriesReducer";
import brands, * as fromBrands from "./brandsReducer";
import orders, * as fromOrders from "./ordersReducer";

export default combineReducers({
    message,
    user,
    products,
    categories,
    brands,
    orders,
})

// user selectors
export const getUser = fromUser.getUser;

// products selectors
export const getProducts = fromProducts.getProducts;
export const getProductsList = fromProducts.getProductsList;
export const getCurrentProduct = fromProducts.getCurrentProduct;
export const getProductsIsLoading = fromProducts.getProductsIsLoading;

// brands selectors
export const getBrands = fromBrands.getBrands;
export const getBrandsList = fromBrands.getBrandsList;
export const getCurrentBrand = fromBrands.getCurrentBrand;
export const getBrandsIsLoading = fromBrands.getBrandsIsLoading;

// categories selectors
export const getCategories = fromCategories.getCategories;
export const getCategoriesList = fromCategories.getCategoriesList;
export const getCurrentCategory = fromCategories.getCurrentCategory;
export const getCategoriesIsLoading = fromCategories.getCategoriesIsLoading;

// message selectors
export const getMessages = fromMessage.getMessages;
export const getMessageSuccess = fromMessage.getMessageSuccess;
export const getMessageError = fromMessage.getMessageError;

// orders selectors 
export const getOrders = fromOrders.getOrders;
export const getOrdersList = fromOrders.getOrdersList;
export const getCurrentOrder = fromOrders.getCurrentOrder;
export const getOrdersIsLoading = fromOrders.getOrdersIsLoading;