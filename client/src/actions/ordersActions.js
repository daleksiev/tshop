import {
    FETCH_ALL_ORDERS,
    FETCH_ALL_ORDERS_SUCCESS,
    FETCH_ALL_ORDERS_ERROR,
    FETCH_ONE_ORDER,
    FETCH_ONE_ORDER_SUCCESS,
    FETCH_ONE_ORDER_ERROR,
    CREATE_ORDER,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,
    DELETE_ORDER,
    DELETE_ORDER_ERROR,
    DELETE_ORDER_SUCCESS,
    CLEAR_ONE_ORDER,
} from '../actionTypes/ordersActionTypes';
import orderService from '../services/orderService';

export const clearOneOrder = () => ({
    type: CLEAR_ONE_ORDER,
})

// fetch one order
export const fetchOneOrder = () => ({
    type: FETCH_ONE_ORDER,
})

export const fetchOneOrderSuccess = (payload) => ({
    type: FETCH_ONE_ORDER_SUCCESS,
    payload,
})

export const fetchOneOrderError = (payload) => ({
    type: FETCH_ONE_ORDER_ERROR,
    payload,
})

export const fetchOneOrderAsync = (orderId, token) => (dispatch) => {
    dispatch(fetchOneOrder());

    return orderService.getOne(orderId, token)
        .then(order => {
            dispatch(fetchOneOrderSuccess(order))
            return order;
        })
        .catch(err => dispatch(fetchOneOrderError(err)));
}

// fetch all orders
export const fetchAllOrdersPending = () => ({
    type: FETCH_ALL_ORDERS,
});

export const fetchAllOrdersSuccess = (payload) => ({
    type: FETCH_ALL_ORDERS_SUCCESS,
    payload,
})

export const fetchAllOrdersError = (payload) => ({
    type: FETCH_ALL_ORDERS_ERROR,
    payload,
})

export const fetchAllOrdersAsync = (token, role, userId) => (dispatch) => {
    dispatch(fetchAllOrdersPending());

    orderService.getAll(token, role, userId)
        .then(orders => dispatch(fetchAllOrdersSuccess(orders)))
        .catch(err => dispatch(fetchAllOrdersError(err)));
}

// create order
export const createOrder = () => ({
    type: CREATE_ORDER,
})

export const createOrderSuccess = (payload) => ({
    type: CREATE_ORDER_SUCCESS,
    payload,
})

export const createOrderError = (payload) => ({
    type: CREATE_ORDER_ERROR,
    payload,
})

export const createOrderAsync = (data, token) => async (dispatch) => {
    dispatch(createOrder());

    return orderService.create(data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }

            return dispatch(createOrderSuccess(res))
        })
}

// update order
export const updateOrder = () => ({
    type: UPDATE_ORDER,
})

export const updateOrderSuccess = (payload) => ({
    type: UPDATE_ORDER_SUCCESS,
    payload,
})

export const updateOrderError = (payload) => ({
    type: UPDATE_ORDER_ERROR,
    payload,
})

export const updateOrderAsync = (id, data, token) => async (dispatch) => {
    dispatch(updateOrder());

    return orderService.update(id, data, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            dispatch(updateOrderSuccess(res))
        })
}

//delete order
export const deleteOrder = () => ({
    type: DELETE_ORDER,
})

export const deleteOrderSuccess = () => ({
    type: DELETE_ORDER_SUCCESS,
})

export const deleteOrderError = (payload) => ({
    type: DELETE_ORDER_ERROR,
    payload,
})

export const deleteOrderAsync = (id, token) => async (dispatch) => {
    dispatch(deleteOrder());

    return orderService.remove(id, token)
        .then(res => {
            if (!res?.ok) {
                throw res;
            }
            return dispatch(deleteOrderSuccess(res))
        });
}