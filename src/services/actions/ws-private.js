export const WS_PRIVATE_START = 'WS_PRIVATE_START';
export const WS_PRIVATE_SUCCESS = 'WS_PRIVATE_SUCCESS';
export const WS_PRIVATE_ERROR = 'WS_PRIVATE_ERROR';
export const WS_PRIVATE_CLOSED = 'WS_PRIVATE_CLOSED';
export const WS_PRIVATE_ORDERS = 'WS_PRIVATE_ORDERS';

export const startPrivateWsConnection =(token)=> {
    return {
        type: WS_PRIVATE_START,
        payload: `?token=${token}`
    }
};

export const closePrivateWsConnection =()=> {
    return {
        type: WS_PRIVATE_CLOSED
    }
};