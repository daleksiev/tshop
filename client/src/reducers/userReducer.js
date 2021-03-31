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

let localStorageUserState = JSON.parse(localStorage.getItem('user'));
localStorageUserState = localStorageUserState?.email ? { ...localStorageUserState, isLoggedIn: true } : userInitialState;

const user = (state = localStorageUserState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return { ...state, ...action.payload, isLoggedIn: true };
        case BUY_PRODUCT_SUCCESS:
            return { ...state, ...action.payload };
        case LOGOUT_USER:
            return { ...userInitialState }
        default:
            return state;
    }
}

export default user;