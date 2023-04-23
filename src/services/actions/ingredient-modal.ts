import { TIngredientDetails } from "../types/data";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS: 'REMOVE_INGREDIENT_DETAILS' = 'REMOVE_INGREDIENT_DETAILS';

export interface ISetIngredientsDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly ingredientDetails: TIngredientDetails;
}

export interface IRemoveIngredientsDetailsAction {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientModalActions =
|IRemoveIngredientsDetailsAction
|ISetIngredientsDetailsAction;

export const setCurrentItem =(item: TIngredientDetails): ISetIngredientsDetailsAction => ({    
    type: SET_INGREDIENT_DETAILS,
    ingredientDetails: item,
})