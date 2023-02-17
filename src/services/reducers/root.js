import { combineReducers } from "redux";
import { ingredientsReducer, constructorReducer, orderReducer, ingredientModalReducer } from "./index";


export const rootReducer = combineReducers({
    ingredientsReducer,
    ingredientModalReducer,
    constructorReducer,
    orderReducer
});