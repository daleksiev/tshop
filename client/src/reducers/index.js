import { combineReducers } from 'redux';
import message from "./messageReducer";
import user from "./userReducer";
import products from "./productsReducer";

export default combineReducers({
    message,
    user,
    products,
})