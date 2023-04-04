import { rootReducer } from "./reducers/root";
import { compose, createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { wsUrl } from "../utils/utils";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { 
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ORDERS
 } from "./actions/ws-public";
 import {
  WS_PRIVATE_START,
  WS_PRIVATE_SUCCESS,
  WS_PRIVATE_ERROR,
  WS_PRIVATE_CLOSED,
  WS_PRIVATE_ORDERS
} from "./actions/ws-private";


const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED,
    onMessage: WS_CONNECTION_ORDERS,
}

const wsPrivateActions = {
  wsInit: WS_PRIVATE_START,
  onOpen: WS_PRIVATE_SUCCESS,
  onError: WS_PRIVATE_ERROR,
  onClose: WS_PRIVATE_CLOSED,
  onMessage: WS_PRIVATE_ORDERS
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${wsUrl}/all`, wsActions), socketMiddleware(wsUrl, wsPrivateActions)));

export const store = createStore(rootReducer, enhancer);
