import { getIngredientsRequest, postOrder } from "../../utils/burger-api";


export const GET_INITIAL_ITEMS_REQUEST = 'GET_INITIAL_ITEMS_REQUEST';
export const GET_INITIAL_ITEMS_SUCCESS = 'GET_INITIAL_ITEMS_SUCCESS';
export const GET_INITIAL_ITEMS_FAILED = 'GET_INITIAL_ITEMS_FAILED';
export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const SORT_CONSTRUCTOR = 'SORT_CONSTRUCTOR';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
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

export const setCurrentItem =(item)=> ({    
    type: SET_INGREDIENT_DETAILS,
    ingredientDetails: item,
})



export const addItem =(item, itemId)=> (    
    item.ingredient.type === 'bun' ? {
        type: ADD_CONSTRUCTOR_BUN,
        bun: item.ingredient
    } : 
    {
        type: ADD_CONSTRUCTOR_ITEM,
        constructorItems: item.ingredient,
        idList: itemId                
    }
)

export const deleteItem=(item, index)=> ({
    type: DELETE_CONSTRUCTOR_ITEM,
    constructorItems: item,
    index: index
})


 export const sortConstructor =(items, dragIndex, hoverIndex)=> {
    const dragItem = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);
    return ({
        type: SORT_CONSTRUCTOR,
        constructorItems: [...items]
    })
 }   



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