import {
    SET_USER_AUTH,
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
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default user;