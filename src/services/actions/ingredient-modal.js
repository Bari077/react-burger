export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';

export const setCurrentItem =(item)=> ({    
    type: SET_INGREDIENT_DETAILS,
    ingredientDetails: item,
})