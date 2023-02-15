import { 
    GET_INITIAL_ITEMS_REQUEST,
    GET_INITIAL_ITEMS_SUCCESS,
    GET_INITIAL_ITEMS_FAILED,
    SET_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
    ADD_CONSTRUCTOR_ITEM,
    ADD_CONSTRUCTOR_BUN,
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,    
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    REMOVE_ORDER_DETAILS,      
} from "../actions/index";

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,    
    ingredientDetails: {},
}

const constructorState = {
    constructorItems: [],
    idList: [], 
    bun: [],
    hasBun: false
}

const orderState = {
    orderRequest: false,
    orderFailed: false,
    orderDetails: {
        name: '',
        order: {
            number: '',
        }
    },
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false
            };
        }
        case GET_INITIAL_ITEMS_SUCCESS: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
                items: action.items
            };
        }
        case GET_INITIAL_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true,
            };
        }
        case SET_INGREDIENT_DETAILS: {
            return {
               ...state,
               ingredientDetails: action.ingredientDetails, 
            }
        }
        case REMOVE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: {}
            }
        }
        default: {
            return state;
        }
    }
};

export const constructorReducer = (state = constructorState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: [...state.constructorItems, action.constructorItems],
                idList: state.idList.some(item => item.id === action.idList) ? 
                state.idList.map(item => item.id === action.idList ? {...item, qty: ++item.qty} : item) :
                [...state.idList, {id : action.idList, qty : 1}]                                               
            }
        }
        case ADD_CONSTRUCTOR_BUN: {
            return {
                ...state,
                bun: action.bun,                
                hasBun: action.bun.type === 'bun' ? true : state.hasBun,
            }
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: state.constructorItems.filter((item, index)=> index !== action.index),
                idList: state.idList.map(item => item.id === action.constructorItems._id ? {...item, qty: item.qty - 1} : item)
            }
        }
        case SORT_CONSTRUCTOR: {
            return{
                ...state,
                constructorItems: action.constructorItems
            }
        }
        case RESET_CONSTRUCTOR: {
            return {
                constructorItems: [],
                idList: [], 
                bun: [],
                hasBun: false
            }
        }
        default: {
            return state;
        }
    }
}

export const orderReducer = (state = orderState, action)=> {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                orderDetails: action.orderDetails,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            };
        }
        case REMOVE_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: {
                    name: '',
                    order: {
                        number: '',
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}
