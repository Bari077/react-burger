import {        
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    REMOVE_ORDER_DETAILS,
    TOrderActions      
} from "../actions/order";

import { TOrderDetails } from "../types/data";

type TOrderState = {
    orderRequest: boolean;
    orderFailed: boolean;
    orderDetails: TOrderDetails | null
}

const orderState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    orderDetails: null,
}

export const orderReducer = (state = orderState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                orderDetails: action.orderDetails,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            };
        }
        case REMOVE_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: null
            }
        }
        default: {
            return state;
        }
    }
}
