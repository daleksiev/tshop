import { SET_USER_AUTH } from '../actionTypes/userActionTypes';

export const setUserAuth = (userInfo) => ({
    type: SET_USER_AUTH,
    payload: userInfo,
})
