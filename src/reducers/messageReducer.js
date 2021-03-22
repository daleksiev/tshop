import {
    ADD_ERROR_MESSAGE,
    ADD_SUCCESS_MESSAGE
} from '../actionTypes/messageActionTypes';

const messageInitialState = {
    success: '',
    error: '',
}

const messageReducer = (state = messageInitialState, action = {}) => {
    switch (action.type) {
        case ADD_SUCCESS_MESSAGE:
            return { ...state, success: action.payload };
        case ADD_ERROR_MESSAGE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default messageReducer;


