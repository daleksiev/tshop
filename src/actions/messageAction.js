import {
    ADD_ERROR_MESSAGE,
    ADD_SUCCESS_MESSAGE
} from '../actionTypes/messageActionTypes';

export const addMessageAction = (msg) => ({ type: ADD_SUCCESS_MESSAGE, payload: msg });

export const addErrorAction = (err) => ({ type: ADD_ERROR_MESSAGE, payload: err });