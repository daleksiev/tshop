import {
    SET_USER_AUTH,
    LOGOUT_USER,
    BUY_PRODUCT_SUCCESS,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_ERROR,
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
    imageUrl: '',
    image: '',
    isLoading: false,
    role: 'user',
}

let localStorageUserState = JSON.parse(localStorage.getItem('user'));
localStorageUserState = localStorageUserState?.email ? { ...localStorageUserState, isLoggedIn: true } : userInitialState;

const user = (state = localStorageUserState, action = {}) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return { ...state, ...action.payload, isLoading: true }
        case SET_USER_AUTH:
            return { ...state, ...action.payload, isLoggedIn: true };
        case UPDATE_USER_INFO_ERROR:
        case BUY_PRODUCT_SUCCESS:
        case UPDATE_USER_INFO_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case LOGOUT_USER:
            return { ...userInitialState }
        default:
            return state;
    }
}

export default user;

export const getUser = (state) => state.user;