import message from "./messageReducer";

const initialState = {
    message: message,
}

const combineReducers = (reducers) => {
    const newReducers = {};
    for (const key in reducers) {
        if (Object.hasOwnProperty.call(reducers, key)) {
            newReducers[key] = reducers[key]();
        }
    }

    return newReducers;
}

export default combineReducers.bind(undefined,initialState);