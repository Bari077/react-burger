import { combineReducers } from "redux";
import { ingredientsReducer, constructorReducer, orderReducer } from "./index";


export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer
});