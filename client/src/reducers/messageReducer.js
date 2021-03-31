import {
    SET_SUCCESS_MESSAGE,
    SET_ERROR_MESSAGE,
} from '../actionTypes/messageActionTypes';

const messageInitialState = {
    success: '',
    error: '',
}

const messageReducer = (state = messageInitialState, action = {}) => {
    switch (action.type) {
        case SET_SUCCESS_MESSAGE:
            return { ...state, success: action.payload };
        case SET_ERROR_MESSAGE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default messageReducer;

export const getMessages = (state) => state.message;
export const getMessageSuccess = (state) => state.message.success;
export const getMessageError = (state) => state.message.error;
