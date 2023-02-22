import { getIngredientsRequest } from "../../utils/burger-api";


export const GET_INITIAL_ITEMS_REQUEST = 'GET_INITIAL_ITEMS_REQUEST';
export const GET_INITIAL_ITEMS_SUCCESS = 'GET_INITIAL_ITEMS_SUCCESS';
export const GET_INITIAL_ITEMS_FAILED = 'GET_INITIAL_ITEMS_FAILED';

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