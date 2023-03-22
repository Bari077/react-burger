import { postOrder } from "../../utils/burger-api";
import { getCookie } from "../../utils/utils";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const REMOVE_ORDER_DETAILS = 'REMOVE_ORDER_DETAILS';


export function sendOrder(orderList) {     
    
    const order = {
        "ingredients" : orderList    
    };
    const accessToken =  getCookie('accessToken');   
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        postOrder(order, accessToken)
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