import {
    SET_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
} from "../actions/ingredient-modal";


const ingredientModalState = {
    ingredientDetails: null,
}

export const ingredientModalReducer = (state= ingredientModalState, action)=> {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
               ...state,
               ingredientDetails: action.ingredientDetails, 
            }
        }
        case REMOVE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: null,
            }
        }
        default: {
            return state;
        }
    }    
}