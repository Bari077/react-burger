import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredient";
import { ingredientModalReducer } from "./ingredient-modal";
import { constructorReducer } from "./constructor";
import {  orderReducer } from "./order";
import { authReducer } from "./auth";
import { wsPublicReducer } from "./ws-public";
import { wsPrivateReducer } from "./ws-private";


export const rootReducer = combineReducers({
    ingredientsReducer,
    ingredientModalReducer,
    constructorReducer,
    orderReducer,
    authReducer,
    wsPublicReducer,
    wsPrivateReducer
});