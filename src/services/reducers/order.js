import {       
        
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    REMOVE_ORDER_DETAILS,      
} from "../actions/order";

const orderState = {
    orderRequest: false,
    orderFailed: false,
    orderDetails: {
        name: '',
        order: {
            number: '',
        }
    },
}

export const orderReducer = (state = orderState, action)=> {
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
                orderDetails: {
                    name: '',
                    order: {
                        number: '',
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}
