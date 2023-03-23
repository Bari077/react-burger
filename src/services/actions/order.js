import { postOrder } from "../../utils/api/burger-api";
import { getCookie } from "../../utils/utils";
import { RESET_CONSTRUCTOR } from "./constructor";

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
            dispatch({type: RESET_CONSTRUCTOR});
            localStorage.removeItem('constructorIngredients');
            localStorage.removeItem('bun');          
        })
        .catch(err => {
            dispatch({
                type: POST_ORDER_FAILED,
            });
        })
    };
}