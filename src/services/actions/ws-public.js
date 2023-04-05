import { WS_PRIVATE_CLOSED } from "./ws-private";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ORDERS = 'WS_CONNECTION_ORDERS';

export const startWsConnection =()=> {
    return {
        type: WS_CONNECTION_START
    }
};

export const closeWsConnection =()=> {
    return {
        type: WS_CONNECTION_CLOSED
    }
};