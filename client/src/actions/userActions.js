import {
    SET_USER_AUTH,
    LOGOUT_USER,
    ADD_TO_FAVOURITES,
    ADD_TO_FAVOURITES_SUCCESS,
    REMOVE_FROM_FAVOURITES,
    REMOVE_FROM_FAVOURITES_SUCCESS,
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


export const addToFavourites = () => ({
    type: ADD_TO_FAVOURITES,
})

export const addToFavouritesSuccess = (payload) => ({
    type: ADD_TO_FAVOURITES_SUCCESS,
    payload,
})

export const addToFavouritesAsync = (userId, productId, token) => async (dispatch) => {
    dispatch(addToFavourites());

    return userService.addToFavourites(userId, productId, token)
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return dispatch(addToFavouritesSuccess(res))
        })
}

export const removeFromFavourites = () => ({
    type: REMOVE_FROM_FAVOURITES,
})

export const removeFromFavouritesSuccess = (payload) => ({
    type: REMOVE_FROM_FAVOURITES_SUCCESS,
    payload,
})

export const removeFromFavouritesAsync = (userId, productId, token) => async (dispatch) => {
    dispatch(removeFromFavourites());

    return userService.removeFromFavourites(userId, productId, token)
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return dispatch(removeFromFavouritesSuccess(res))
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