import { getIngredientsRequest, postOrder } from "../../utils/burger-api";
import { createRandomIngredients } from "../../utils/utils";

export const GET_INITIAL_ITEMS_REQUEST = 'GET_INITIAL_ITEMS_REQUEST';
export const GET_INITIAL_ITEMS_SUCCESS = 'GET_INITIAL_ITEMS_SUCCESS';
export const GET_INITIAL_ITEMS_FAILED = 'GET_INITIAL_ITEMS_FAILED';
export const GET_CONSTRUCTOR_ITEMS = 'GET_CONSTRUCTOR_ITEMS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const REMOVE_ORDER_DETAILS = 'REMOVE_ORDER_DETAILS';

export function getItems() {
    return function(dispatch) {
        dispatch({
            type: GET_INITIAL_ITEMS_REQUEST,
        });
        getIngredientsRequest()
        .then((res) => {           
            dispatch({
                type: GET_INITIAL_ITEMS_SUCCESS,
                items: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_INITIAL_ITEMS_FAILED,
            });
        })
    };
}

export function setCurrentItem(items, index) {
    const currentItem = items[index];
    return function(dispatch) {
        dispatch({
            type: SET_INGREDIENT_DETAILS,
            ingredientDetails: currentItem,
        })
    }
}

export function getConstructorItems(items) {    
    return function(dispatch) {
        dispatch({
            type: GET_CONSTRUCTOR_ITEMS,
            constructorItems: items,
        });        
    }
}

export function sendOrder(constructorItems) {
    const idList = constructorItems.map((i) => i._id)
    const order = {
        "ingredients" : idList    
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