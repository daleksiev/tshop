import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_PRODUCT_COUNT,
    INCREASE_COUNT,
    DECREASE_COUNT,
} from '../actionTypes/cartActionTypes';

let cartProductInitialState = {
    _id: '',
    title: '',
    imageUrl: '',
    price: 0,
    count: 0,
}

const cartProduct = (state = cartProductInitialState, action = {}) => {
    if (action?.productId && state._id !== action.productId) {
        return state;
    }


    switch (action.type) {
        case CHANGE_PRODUCT_COUNT:
            return { ...state, count: action.payload };
        case INCREASE_COUNT:
            return { ...state, count: state.count + 1 };
        case DECREASE_COUNT:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}

const cartLocalStorageState = JSON.parse(localStorage.getItem('cart'));
export const cartState = cartLocalStorageState?.length ? cartLocalStorageState : [];

const cart = (state = cartState, action = {}) => {
    let newState = state.slice();
    switch (action.type) {
        case ADD_TO_CART:
            newState = [...state, { ...action.payload }];
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case REMOVE_FROM_CART:
            const foundProductIndex = state.findIndex(x => x._id === action.productId);
            newState.splice(foundProductIndex, 1);
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case CHANGE_PRODUCT_COUNT:
        case INCREASE_COUNT:
        case DECREASE_COUNT:
            newState = newState.map(x => cartProduct(x, action));
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
}

export default cart;