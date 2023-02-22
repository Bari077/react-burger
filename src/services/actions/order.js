import { postOrder } from "../../utils/burger-api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const REMOVE_ORDER_DETAILS = 'REMOVE_ORDER_DETAILS';


export function sendOrder(orderList) {     
    
    const order = {
        "ingredients" : orderList    
    }    
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        postOrder(order)
        .then(data => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                orderDetails: data,
            });          
        })
        .catch(err => {
            dispatch({
                type: POST_ORDER_FAILED,
            });
        })
    };
}