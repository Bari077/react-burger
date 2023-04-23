import {
    SET_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
    TIngredientModalActions
} from "../actions/ingredient-modal";

import { TIngredientDetails } from "../types/data";

type TIngredientModalState = {
    ingredientDetails: TIngredientDetails | null
}

const ingredientModalState = {
    ingredientDetails: null,
}

export const ingredientModalReducer = (state= ingredientModalState, action: TIngredientModalActions): TIngredientModalState => {
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