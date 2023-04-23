import { TWsOrders } from "../types/data";

export const WS_PRIVATE_START: 'WS_PRIVATE_START' = 'WS_PRIVATE_START';
export const WS_PRIVATE_SUCCESS: 'WS_PRIVATE_SUCCESS' = 'WS_PRIVATE_SUCCESS';
export const WS_PRIVATE_ERROR: 'WS_PRIVATE_ERROR' = 'WS_PRIVATE_ERROR';
export const WS_PRIVATE_CLOSED: 'WS_PRIVATE_CLOSED' = 'WS_PRIVATE_CLOSED';
export const WS_PRIVATE_ORDERS: 'WS_PRIVATE_ORDERS' = 'WS_PRIVATE_ORDERS';

export interface IWsPrivateAction {
    readonly type: typeof WS_PRIVATE_START;
    readonly payload: string
}

export interface IWsPrivateSuccessAction {
    readonly type: typeof WS_PRIVATE_SUCCESS
}

export interface IWsPrivateErrorAction {
    readonly type: typeof WS_PRIVATE_ERROR
}

export interface IWsPrivateCloseAction {
    readonly type: typeof WS_PRIVATE_CLOSED
}

export interface IWsPrivateOrdersAction {
    readonly type: typeof WS_PRIVATE_ORDERS;
    readonly payload: TWsOrders;
}

export type TWsPrivateActions =
|IWsPrivateAction
|IWsPrivateCloseAction
|IWsPrivateErrorAction
|IWsPrivateOrdersAction
|IWsPrivateSuccessAction;

export const startPrivateWsConnection =(token: string): IWsPrivateAction => {
    return {
        type: WS_PRIVATE_START,
        payload: `?token=${token}`
    }
};

export const closePrivateWsConnection =(): IWsPrivateCloseAction => {
    return {
        type: WS_PRIVATE_CLOSED
    }
};