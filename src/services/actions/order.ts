import { postOrder } from "../../utils/api/burger-api";
import { getCookie } from "../../utils/utils";
import { resetConstructorAction } from "./constructor";
import { TOrderDetails } from "../types/data";
import { AppDispatch } from "../types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const REMOVE_ORDER_DETAILS: 'REMOVE_ORDER_DETAILS' = 'REMOVE_ORDER_DETAILS';

export interface IPostOrderAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly orderDetails: TOrderDetails;
}

export interface IPostRemoveOrderAction {
    readonly type: typeof REMOVE_ORDER_DETAILS;
}

export type TOrderActions =
|IPostOrderAction
|IPostOrderFailedAction
|IPostOrderSuccessAction
|IPostRemoveOrderAction;

const postOrderAction = (): IPostOrderAction => ({
    type: POST_ORDER_REQUEST
});
  
const postOrderFailedAction = (): IPostOrderFailedAction => ({
    type: POST_ORDER_FAILED
});
  
const postOrderSuccessAction = (orderDetails: TOrderDetails): IPostOrderSuccessAction => ({
    type: POST_ORDER_SUCCESS,
    orderDetails
});


export function sendOrder(orderList: ReadonlyArray<string>) {     
    console.log(orderList)
    const order = {
        "ingredients" : orderList    
    };
    const accessToken =  getCookie('accessToken');   
    return function(dispatch: AppDispatch) {
        dispatch(postOrderAction());
        postOrder(order, accessToken)
        .then(data => {
            dispatch(postOrderSuccessAction({...data}));
            dispatch(resetConstructorAction());
            localStorage.removeItem('constructorIngredients');
            localStorage.removeItem('bun');          
        })
        .catch(err => {
            dispatch(postOrderFailedAction());
        })
    };
}