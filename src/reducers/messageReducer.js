import { useReducer } from "react";

const ADD_SUCCESS_MESSAGE = 'ADD_SUCCESS_MESSAGE';
const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE';

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

export const addMessageAction = (msg) => ({ type: ADD_SUCCESS_MESSAGE, payload: msg });

export const addErrorAction = (err) => ({ type: ADD_ERROR_MESSAGE, payload: err });

const useMessageReducer = () => useReducer(messageReducer, messageInitialState)

export default useMessageReducer;

// export const addMessage = (msg) => dispatch(addMessageAction(msg));
// export const addError = (err) => dispatch(addErrorAction(err));


