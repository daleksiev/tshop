import {
    SET_USER_AUTH,
    LOGOUT_USER,
    BUY_PRODUCT,
    BUY_PRODUCT_SUCCESS,
} from '../actionTypes/userActionTypes';

import userService from '../services/userService';

export const setUserAuth = (userInfo) => ({
    type: SET_USER_AUTH,
    payload: userInfo,
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
})


export const buyProduct = () => ({
    type: BUY_PRODUCT,
})

export const buyProductSuccess = (payload) => ({
    type: BUY_PRODUCT_SUCCESS,
    payload,
})

export const buyProductAsync = (userId, productId) => async (dispatch) => {
    dispatch(buyProduct());

    userService.buyProduct(userId, productId)
        .then(user => dispatch(buyProductSuccess(user)))
        .catch(err => console.log(err));
}