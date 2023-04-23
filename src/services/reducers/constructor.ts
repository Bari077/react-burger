import {
    ADD_CONSTRUCTOR_ITEM,
    ADD_CONSTRUCTOR_BUN,
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
    TConstructorActions
} from "../actions/constructor";

import { TIngredientDetails } from "../types/data";

type TConstructorState = {
    constructorItems: ReadonlyArray<TIngredientDetails>;
    bun: TIngredientDetails | null
}

const itemStorageValue = localStorage.getItem('constructorIngredients');
let parsedItem;
if(typeof itemStorageValue === 'string') {    
    parsedItem = JSON.parse(itemStorageValue)    
};

const bunStorageValue = localStorage.getItem('bun');
let parsedBun;
if(typeof bunStorageValue === 'string') {    
    parsedBun = JSON.parse(bunStorageValue)    
};

const constructorState: TConstructorState = {
    constructorItems: parsedItem ? parsedItem : [], 
    bun: parsedBun ? parsedBun : null,
}

export const constructorReducer = (state = constructorState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: [...state.constructorItems, action.constructorItems],                                             
            }
        }
        case ADD_CONSTRUCTOR_BUN: {
            return {
                ...state,
                bun: action.bun,
            }
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: state.constructorItems.filter((item, index: number)=> index !== action.index),
            }
        }
        case SORT_CONSTRUCTOR: {
            return{
                ...state,
                constructorItems: action.constructorItems
            }
        }
        case RESET_CONSTRUCTOR: {
            return {
                constructorItems: [], 
                bun: null,
            }
        }
        default: {
            return state;
        }
    }
}
