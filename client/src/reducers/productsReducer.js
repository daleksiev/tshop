import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS,
} from '../actionTypes/productsActionTypes';

const productsInitialState = [];

const products = (state = productsInitialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return action.payload.slice();
        case FETCH_PRODUCTS_ERROR:
        case FETCH_PRODUCTS:
        default:
            return state;
    }
}

export default products