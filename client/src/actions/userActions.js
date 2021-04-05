import {
    SET_USER_AUTH,
    LOGOUT_USER,
    BUY_PRODUCT,
    BUY_PRODUCT_SUCCESS,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_ERROR,
    UPDATE_USER_INFO_SUCCESS,
} from '../actionTypes/userActionTypes';

import userService from '../services/userService';

export const setUserAuth = (userInfo) => ({
    type: SET_USER_AUTH,
    payload: userInfo,
})

export const fetchUserAuthAsync = (userId) => (dispatch) => {
    userService.getOne(userId)
        .then(userInfo => dispatch(setUserAuth(userInfo)))
        .catch(err => console.log(err));
}

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

export const buyProductAsync = (userId, productId, token) => async (dispatch) => {
    dispatch(buyProduct());

    return userService.buyProduct(userId, productId, token)
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return dispatch(buyProductSuccess(res))
        })
}

export const updateUserInfo = () => ({
    type: UPDATE_USER_INFO,
})

export const updateUserInfoSuccess = (payload) => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload,
})

export const updateUserInfoError = (payload) => ({
    type: UPDATE_USER_INFO_ERROR,
    payload,
})

export const updateUserInfoAsync = (userId, userInfo, token) => (dispatch) => {
    dispatch(updateUserInfo());

    return userService.update(userId, userInfo, token)
        .then(res => dispatch(updateUserInfoSuccess(res)))
    // .catch(err => dispatch(updateUserInfoError(err)));
}