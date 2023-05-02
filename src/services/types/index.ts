import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../store";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientModalActions } from "../actions/ingredient-modal";
import { TInitialItemsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWsPrivateActions } from "../actions/ws-private";
import { TWsConnectionActions } from "../actions/ws-public";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type TApplicationActions =
TConstructorActions|
TIngredientModalActions|
TInitialItemsActions|
TOrderActions|
TUserActions|
TWsConnectionActions|
TWsPrivateActions;

export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;

