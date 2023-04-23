import {
    GET_INITIAL_ITEMS_REQUEST,
    GET_INITIAL_ITEMS_SUCCESS,
    GET_INITIAL_ITEMS_FAILED,
    TInitialItemsActions
} from "../actions/ingredients";

import { TIngredientDetails } from "../types/data";

type TInitialState = {
    items: ReadonlyArray<TIngredientDetails>;
    itemsRequest: boolean;
    itemsFailed: boolean;
}

const initialState: TInitialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false, 
}

export const ingredientsReducer = (state = initialState, action: TInitialItemsActions): TInitialState => {
    switch (action.type) {
        case GET_INITIAL_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false
            };
        }
        case GET_INITIAL_ITEMS_SUCCESS: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
                items: action.items
            };
        }
        case GET_INITIAL_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true,
            };
        }        
        default: {
            return state;
        }
    }
};