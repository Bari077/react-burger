import {
    ADD_CONSTRUCTOR_ITEM,
    ADD_CONSTRUCTOR_BUN,
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
} from "../actions/constructor";

const constructorState = {
    constructorItems: JSON.parse(localStorage.getItem('constructorIngredients')) ? JSON.parse(localStorage.getItem('constructorIngredients')) : [], 
    bun: JSON.parse(localStorage.getItem('bun')) ? JSON.parse(localStorage.getItem('bun')) : null,
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
            }
        }
        default: {
            return state;
        }
    }
}
