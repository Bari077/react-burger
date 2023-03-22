import { 
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    RESET_REQUEST_STATUS
} from "../actions/auth";

const authState = {
    user: null,
    isAuthenticated : false,
    success: false,
    error: false,       
}

export const authReducer = (state = authState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
            };
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,               
                user: action.user,
                success: true
            };
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                error: true
            };
        }




        case LOGIN_USER_REQUEST: {
            return {
                ...state,
            };
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                success: action.success,
                isAuthenticated: true
            };
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                error: true
            };
        }



        case LOGOUT_REQUEST: {
            return {
                ...state,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                user: null,                
                isAuthenticated : false
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state
            };
        }


        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.success,
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                error: true
            };
        }


        case RESET_PASSWORD_REQUEST: {
            return {
                ...state
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.success,
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                error: true
            };
        }


        case GET_USER_REQUEST: {
            return {
                ...state,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                user: null
            };
        }
        
        
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.user
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state
            };
        }


        case RESET_REQUEST_STATUS: {
            return {
                ...state,
                error: false,
                success: false
            }
        }
        default: {
            return state;
        }
    }
};