import {
    WS_PRIVATE_SUCCESS,
    WS_PRIVATE_ERROR,
    WS_PRIVATE_CLOSED,
    WS_PRIVATE_ORDERS,
    TWsPrivateActions
} from "../actions/ws-private";
import { TWsOrders } from "../types/data";

type TWsPrivateState = {
    wsPrivateConnected: boolean;
    wsPrivateError: boolean;
    userOrders: TWsOrders | null
}

const wsPrivateState: TWsPrivateState = {
    wsPrivateConnected: false,
    wsPrivateError: false,
    userOrders: null
}

export const wsPrivateReducer =(state = wsPrivateState, action: TWsPrivateActions): TWsPrivateState=> {
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