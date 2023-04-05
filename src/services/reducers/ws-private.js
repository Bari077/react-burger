import {
    WS_PRIVATE_SUCCESS,
    WS_PRIVATE_ERROR,
    WS_PRIVATE_CLOSED,
    WS_PRIVATE_ORDERS
} from "../actions/ws-private";


const wsPrivateState = {
    wsPrivateConnected: false,
    wsPrivateError: false,
    userOrders: null
}

export const wsPrivateReducer =(state = wsPrivateState, action)=> {
    switch(action.type) {
        case WS_PRIVATE_SUCCESS:
            return {
                ...state,
                wsPrivateConnected: true,
                wsPrivateError: false
            }
        case WS_PRIVATE_ERROR:
            return {
                ...state,
                wsPrivateConnected: false,
                wsPrivateError: true,
                userOrders: null
            }
        case WS_PRIVATE_CLOSED:
            return {
                ...state,
                wsPrivateConnected: false,
                wsPrivateError: false,
                userOrders: null
            }
        case WS_PRIVATE_ORDERS:
            const userOrders = action.payload;
            return {
                ...state,
                userOrders: {
                    ...userOrders,
                    orders: userOrders.orders.reverse(),
                }
            }
        default:
            return state
    }
}