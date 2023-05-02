import { getIngredientsRequest } from "../../utils/api/burger-api";
import { TIngredientDetails } from "../types/data";
import { AppDispatch } from "../types";

export const GET_INITIAL_ITEMS_REQUEST: 'GET_INITIAL_ITEMS_REQUEST' = 'GET_INITIAL_ITEMS_REQUEST';
export const GET_INITIAL_ITEMS_SUCCESS: 'GET_INITIAL_ITEMS_SUCCESS' = 'GET_INITIAL_ITEMS_SUCCESS';
export const GET_INITIAL_ITEMS_FAILED: 'GET_INITIAL_ITEMS_FAILED' = 'GET_INITIAL_ITEMS_FAILED';


export interface IGetInitialItemsAction {
    readonly type: typeof GET_INITIAL_ITEMS_REQUEST;
}

export interface IGetInitialItemsFailedAction {
    readonly type: typeof GET_INITIAL_ITEMS_FAILED;
}

export interface IGetInitialItemsSuccessAction {
    readonly type: typeof GET_INITIAL_ITEMS_SUCCESS;
    readonly items: ReadonlyArray<TIngredientDetails>;
}

export type TInitialItemsActions =
|IGetInitialItemsAction
|IGetInitialItemsFailedAction
|IGetInitialItemsSuccessAction;

const getItemsAction =(): IGetInitialItemsAction => ({
    type: GET_INITIAL_ITEMS_REQUEST
})

const getItemsFailedAction =(): IGetInitialItemsFailedAction => ({
    type: GET_INITIAL_ITEMS_FAILED
})

const getItemsSuccessAction =(items: ReadonlyArray<TIngredientDetails>): IGetInitialItemsSuccessAction => ({
    type: GET_INITIAL_ITEMS_SUCCESS,
    items
})

export function getItems() {
    return function(dispatch: AppDispatch) {
        dispatch(getItemsAction());
        getIngredientsRequest()
        .then((res) => {           
            dispatch(getItemsSuccessAction([...res.data]));
        })
        .catch((err) => {
            dispatch(getItemsFailedAction());
        })
    };
}