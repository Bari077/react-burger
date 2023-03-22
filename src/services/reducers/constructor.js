import {
    ADD_CONSTRUCTOR_ITEM,
    ADD_CONSTRUCTOR_BUN,
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
} from "../actions/constructor";

const constructorState = {
    constructorItems: [], 
    bun: null,
    hasBun: false
}

export const constructorReducer = (state = constructorState, action) => {
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
                hasBun: action.bun.type === 'bun' ? true : state.hasBun,
            }
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: state.constructorItems.filter((item, index)=> index !== action.index),
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
                hasBun: false
            }
        }
        default: {
            return state;
        }
    }
}