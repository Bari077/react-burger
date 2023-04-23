import { registerUserRequest,
loginRequest,
logoutRequest,
forgotPasswordRequest,
resetPasswordRequest } from "../utils/api/auth-api";
import { setCookie, getCookie } from "../utils/utils";
import { getUserRequest, updateUserRequest } from "../utils/api/user-api";
import { registerUserAction,
registerUserFailedAction,
registerUserSuccessAction,
loginAction,
loginFailedAction,
loginSuccessAction,
logoutAction,
logoutFailedAction,
logoutSuccessAction,
forgotPasswordAction,
forgotPasswordFailedAction,
forgotPasswordSuccessAction,
resetPasswordAction,
resetPasswordFailedAction,
resetPasswordSuccessAction,
getUserAction,
getUserFailedAction,
getUserSuccessAction,
getUserFinishedAction,
updateUserAction,
updateUserFailedAction,
updateUserSuccessAction } from "./actions/user";

export function registerUser(form, {onSuccess, onError}) {
    return function(dispatch) {
        dispatch(registerUserAction());
        registerUserRequest(form)
        .then((res) => {
            if(res.success) {
                dispatch(registerUserSuccessAction());
                onSuccess();
            }                       
        })
        .catch((err) => {                                    
            dispatch(registerUserFailedAction());
            onError();
        })        
    };
}


export function signIn(form, {onSuccess, onError}) {
    return function(dispatch) {
        dispatch(loginAction());
        loginRequest(form)
        .then((res) => {
            if(res.success) {
                setCookie('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);          
                dispatch(loginSuccessAction({...res.user}));
                onSuccess();
            }             
        })
        .catch((err) => {
            dispatch(loginFailedAction());
            onError();
        })
    }
}



export function signOut(refreshToken) {

    return function(dispatch) {        
        dispatch(logoutAction());
        logoutRequest(refreshToken)
        .then((res) => {
            if(res.success) {
                dispatch(logoutSuccessAction());
                localStorage.removeItem('refreshToken');
                setCookie('accessToken', "", {'max-age' : -1});        
            }           
        })
        .catch((err) => {
            dispatch(logoutFailedAction());
        })
    }
}

export function forgotPassword(mail,{ onSuccess}) {
    return function(dispatch) {
        dispatch(forgotPasswordAction());
        forgotPasswordRequest(mail)
        .then((res)=> {
            if(res.success) {
                dispatch(forgotPasswordSuccessAction());
                onSuccess();
            }            
        })
        .catch((err) => {
            dispatch(forgotPasswordFailedAction());
        })
    }
}

export function resetPassword(form, {onSuccess, onError}) {
    return function(dispatch) {
        dispatch(resetPasswordAction());
        resetPasswordRequest(form)
        .then((res)=> {
            dispatch(resetPasswordSuccessAction())
            onSuccess();
        })
        .catch((err) => {
            dispatch(resetPasswordFailedAction());
            onError();
        })
    }
}

export function getUserInfo() {
    return function(dispatch) {
        dispatch(getUserAction());
        getUserRequest(getCookie('accessToken'))
        .then((res)=> {                        
            if(res.success) {                
                dispatch(getUserSuccessAction({...res.user}));
            }
        })
        .catch((err) => {
            dispatch(getUserFailedAction());
        })
        .finally(()=> {
            dispatch(getUserFinishedAction());
        })              
    }
}

export function updateUser(form) {
    return function(dispatch) {
        dispatch(updateUserAction());
        updateUserRequest(form, getCookie('accessToken'))
        .then((res)=> {
            dispatch(updateUserSuccessAction({...res.user}));
        })
        .catch((err) => {
            dispatch(updateUserFailedAction());
        })
    }
}