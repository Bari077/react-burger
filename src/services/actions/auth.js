import {    registerUserRequest,
            loginRequest,
            logoutRequest,
            forgotPasswordRequest,
            resetPasswordRequest } from "../../utils/auth-api";

import { setCookie, getCookie } from "../../utils/utils";
import { getUserRequest, updateUserRequest } from "../../utils/user-api";


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const RESET_REQUEST_STATUS = 'RESET_REQUEST_STATUS';


export function registerUser(form) {
    return function(dispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST,
        });
        registerUserRequest(form)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    user: res.user,
                    success: res.success                
                });
            }                       
        })
        .catch((err) => {                                    
            dispatch({
                type: REGISTER_USER_FAILED                
            });
        })        
    };
}


export function signIn(form) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST,
        });
        loginRequest(form)
        .then((res) => {
            if(res.success) {
                setCookie('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);          
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: res.user,
                    success: res.success
                });
            }             
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_USER_FAILED,
            });
        })
    }
}



export function signOut(refreshToken) {

    return function(dispatch) {        
        dispatch({
            type: LOGOUT_REQUEST,
        });
        logoutRequest(refreshToken)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                });
                localStorage.removeItem('refreshToken');
                setCookie('accessToken', "", {'max-age' : -1});        
            }           
        })
        .catch((err) => {
            dispatch({
                type: LOGOUT_FAILED,
            });
        })
    }
}

export function forgotPassword(mail) {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPasswordRequest(mail)
        .then((res)=> {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                success: res.success
            })
        })
        .catch((err) => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
            });
        })
    }
}

export function resetPassword(form) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPasswordRequest(form)
        .then((res)=> {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                success: res.success
            })
        })
        .catch((err) => {
            dispatch({
                type: RESET_PASSWORD_FAILED,
            });
        })
    }
}

export function getUserInfo() {
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUserRequest(getCookie('accessToken'))
        .then((res)=> {                        
            if(res.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user,
                });
            }          
        })
        .catch((err) => {
            dispatch({
                type: GET_USER_FAILED,
            });
        })              
    }
}

export function updateUser(form) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        updateUserRequest(form, getCookie('accessToken'))
        .then((res)=> {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                user: res.user,
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_USER_FAILED,
            });
        })
    }
}