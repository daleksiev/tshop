import {
    SET_USER_AUTH,
    LOGOUT_USER,
} from '../actionTypes/userActionTypes';

const userInitialState = {
    uid: '',
    displayName: '',
    email: '',
    accessToken: '',
    refreshToken: '',
    isLoggedIn: false,
}

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return { ...state, ...action.payload, isLoggedIn: true };
        case LOGOUT_USER:
            return { ...state, isLoggedIn: false };
        default:
            return { ...state };
    }
}

export default user;