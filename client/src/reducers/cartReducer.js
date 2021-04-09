import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../actionTypes/cartActionTypes';

// let cartProductInitialState = {
//     _id: '',
//     price: 0,
//     count: 0,
// }

// const cartProduct = (state = cartProductInitialState, action = {}) => {
//     switch (action.payload) {
//         case ADD_TO_CART:
//             return { ...state, ...action.payload };
//         default:
//             return state;
//     }
// }

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
        default:
            return state;
    }
}

export default cart;