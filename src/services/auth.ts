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
import { TUser, TAuthUser } from "./types/data";
import { AppDispatch, AppThunk } from "./types";


interface IErrorSuccessCallback {
    onSuccess : ()=> void;
    onError : ()=> void
}

export const registerUser =(form: TAuthUser,
 {onSuccess, onError}: IErrorSuccessCallback )=> {
    return function(dispatch: AppDispatch) {
        dispatch(registerUserAction());
        registerUserRequest(form)
        .then((res) => {
            if(res.success) {
                dispatch(registerUserSuccessAction());
                onSuccess() 
            }                       
        })
        .catch((err) => {                                    
            dispatch(registerUserFailedAction());
            onError();
        })        
    };
}


export const signIn =(form: Omit<TAuthUser, 'name'>,
 {onSuccess, onError}: IErrorSuccessCallback)=> {
    return function(dispatch: AppDispatch) {
        dispatch(loginAction());
        loginRequest(form)
        .then((res) => {
            if(res.success) {
                setCookie('accessToken', res.accessToken, {});
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



export function signOut(refreshToken: string) {

    return function(dispatch: AppDispatch) {        
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

export function forgotPassword(mail: Omit<TUser, 'name'>,
{onSuccess}: Omit<IErrorSuccessCallback, 'onError'>) {
    return function(dispatch: AppDispatch) {
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

export function resetPassword(form: Omit<TAuthUser, 'email' | 'name'> & { token: string},
 {onSuccess, onError}: IErrorSuccessCallback) {
    return function(dispatch: AppDispatch) {
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
    const accessToken = getCookie('accessToken');
    return function(dispatch: AppDispatch) {
        dispatch(getUserAction());
        if(accessToken) {
            getUserRequest(accessToken)
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
        } else {
            dispatch(getUserFailedAction());
            dispatch(getUserFinishedAction())
        }                      
    }
}

export function updateUser(form: TUser & { password?: string}) {
    const accessToken = getCookie('accessToken');
    return function(dispatch: AppDispatch) {
        dispatch(updateUserAction());
        if(accessToken) {
            updateUserRequest(form, accessToken)
            .then((res)=> {
                dispatch(updateUserSuccessAction({...res.user}));
            })
            .catch((err) => {
                dispatch(updateUserFailedAction());
            })
        } else {
            dispatch(updateUserFailedAction())
        }                
    }
}