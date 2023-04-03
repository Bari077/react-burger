import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ORDERS
} from "../actions/ws-public";

const wsPublicState = {
    wsConnected: false,
    wsError: false,
    publicOrders: null
}

export const wsPublicReducer = (state = wsPublicState, action)=> {
    switch(action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                wsError: false
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsError: true
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                wsError: false,
                publicOrders: null
            }
        case WS_CONNECTION_ORDERS:
            return {
                ...state,
                publicOrders: action.payload
            }
        default:
            return state         
    }
}