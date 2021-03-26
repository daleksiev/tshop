import {
    SET_ERROR_MESSAGE,
    SET_SUCCESS_MESSAGE
} from '../actionTypes/messageActionTypes';

export const setMessage = (msg) => ({ type: SET_SUCCESS_MESSAGE, payload: msg });

export const setError = (err) => ({ type: SET_ERROR_MESSAGE, payload: err });