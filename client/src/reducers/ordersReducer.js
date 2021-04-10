import {
    FETCH_ALL_ORDERS_SUCCESS,
    FETCH_ALL_ORDERS_ERROR,
    FETCH_ALL_ORDERS,
    FETCH_ONE_ORDER_SUCCESS,
    FETCH_ONE_ORDER_ERROR,
    FETCH_ONE_ORDER,
    CREATE_ORDER,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,
    DELETE_ORDER,
    DELETE_ORDER_ERROR,
    DELETE_ORDER_SUCCESS,
} from '../actionTypes/ordersActionTypes';
import { combineReducers } from 'redux';

const currentOrderInitialState = {
    _id: '',
    name: '',
    imageUrl: '',
    products: [],
};

const currentOrder = (state = currentOrderInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ONE_ORDER_SUCCESS:
        case FETCH_ONE_ORDER_ERROR:
        case FETCH_ONE_ORDER:
        case UPDATE_ORDER_SUCCESS:
        case UPDATE_ORDER:
        case UPDATE_ORDER_ERROR:
            return { ...currentOrderInitialState, ...action.payload };
        case CREATE_ORDER:
        case CREATE_ORDER_ERROR:
        case CREATE_ORDER_SUCCESS:
        case DELETE_ORDER:
        case DELETE_ORDER_ERROR:
        case DELETE_ORDER_SUCCESS:
        default:
            return state;
    }
}

const ordersInitialState = {
    list: [],
    isLoading: false,
}

const orders = (state = ordersInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_ORDERS_SUCCESS:
            return { ...state, list: [...action.payload], isLoading: false };
        case FETCH_ALL_ORDERS:
            return { ...state, isLoading: true };
        case FETCH_ALL_ORDERS_ERROR:
        default:
            return { ...state };
    }
}

export default combineReducers({
    orders,
    current: currentOrder,
})

export const getOrders = (state) => state.orders
export const getOrdersList = (state) => state.orders.orders.list
export const getOrdersIsLoading = (state) => state.orders.orders.isLoading
export const getCurrentOrder = (state) => state.orders.current