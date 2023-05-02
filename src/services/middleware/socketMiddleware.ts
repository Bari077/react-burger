import { WS_PRIVATE_START } from "../actions/ws-private";
import { AppDispatch, RootState } from "../types";
import { TWsMiddlewareActions } from "../types/websocket";
import { Middleware, MiddlewareAPI } from "redux";

export const socketMiddleware = (wsUrl: string, wsActions: TWsMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsInit) {
        socket = type === WS_PRIVATE_START ? 
        new WebSocket(`${wsUrl}${action.payload}`) :
        new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });          
        };
        if(type === onClose) {
          socket.close();
        }
      }      

      next(action);
    };
  };
};