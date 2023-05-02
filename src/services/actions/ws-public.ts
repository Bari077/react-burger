import { TWsOrders } from "../types/data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ORDERS: 'WS_CONNECTION_ORDERS' = 'WS_CONNECTION_ORDERS';

export interface IWsConnectionAction {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsConnectionOrdersAction {
    readonly type: typeof WS_CONNECTION_ORDERS;
    readonly payload: TWsOrders;
}

export type TWsConnectionActions =
|IWsConnectionAction
|IWsConnectionSuccessAction
|IWsConnectionCloseAction
|IWsConnectionOrdersAction
|IWsConnectionErrorAction;

export const startWsConnection =(): IWsConnectionAction=> {
    return {
        type: WS_CONNECTION_START
    }
};

export const closeWsConnection =(): IWsConnectionCloseAction=> {
    return {
        type: WS_CONNECTION_CLOSED
    }
};