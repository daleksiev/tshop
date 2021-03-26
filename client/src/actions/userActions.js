import {
    SET_USER_AUTH,
    LOGOUT_USER,
} from '../actionTypes/userActionTypes';

export const setUserAuth = (userInfo) => ({
    type: SET_USER_AUTH,
    payload: userInfo,
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
})
