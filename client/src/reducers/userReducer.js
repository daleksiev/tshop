import {
    SET_USER_AUTH,
    LOGOUT_USER,
    BUY_PRODUCT_SUCCESS,
} from '../actionTypes/userActionTypes';

const userInitialState = {
    _id: '',
    uid: '',
    displayName: '',
    email: '',
    accessToken: '',
    refreshToken: '',
    bought: [],
    isLoggedIn: false,
}

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return { ...state, ...action.payload, isLoggedIn: true };
        case LOGOUT_USER:
            return { ...state, isLoggedIn: false };
        case BUY_PRODUCT_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return { ...state };
    }
}

export default user;