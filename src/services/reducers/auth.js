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
    RESET_ERROR_STATUS,
    RESET_SUCCESS_STATUS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_FINISHED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
} from "../actions/auth";

const authState = {
    user: null,
    isUserLoaded: false,
    userRequest: false,
    isError: false,
    isSuccess: false,       
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
            };
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                isError: true,
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
            };
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                isError: true,
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
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
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
                isSuccess: true,
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                isError: true
            };
        }

        case RESET_ERROR_STATUS: {
            return {
                ...state,
                isError: false
            }
        }

        case RESET_SUCCESS_STATUS: {
            return {
                ...state,
                isSuccess: false
            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                isUserLoaded: false,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                isUserLoaded: false,
                userRequest: false,
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                user: null,
                isUserLoaded: false,
                userRequest: false,
            };
        }
        case GET_USER_FINISHED: {
            return {
                ...state,
                isUserLoaded: true,
                userRequest: false,
            }
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



        default: {
            return state;
        }
    }
};