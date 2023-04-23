
import { TUser } from "../types/data";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const RESET_ERROR_STATUS: 'RESET_ERROR_STATUS' = 'RESET_ERROR_STATUS';
export const RESET_SUCCESS_STATUS: 'RESET_SUCCESS_STATUS' = 'RESET_SUCCESS_STATUS';
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const GET_USER_FINISHED: 'GET_USER_FINISHED' = 'GET_USER_FINISHED';
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';


export interface IRegisterUserAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface ILoginAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly user: TUser;
}

export interface ILogoutAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetErrorStatusAction {
    readonly type: typeof RESET_ERROR_STATUS;
}

export interface IResetSuccessStatusAction {
    readonly type: typeof RESET_SUCCESS_STATUS;
}

export interface IGetUserAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IGetUserFinishedAction {
    readonly type: typeof GET_USER_FINISHED;
}

export interface IUpdateUserAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export type TUserActions = 
|IRegisterUserAction
|IRegisterUserFailedAction
|IRegisterUserSuccessAction
|ILoginAction
|ILoginFailedAction
|ILoginSuccessAction
|ILogoutAction
|ILogoutFailedAction
|ILogoutSuccessAction
|IForgotPasswordAction
|IForgotPasswordFailedAction
|IForgotPasswordSuccessAction
|IResetPasswordAction
|IResetPasswordFailedAction
|IResetPasswordSuccessAction
|IResetErrorStatusAction
|IResetSuccessStatusAction
|IGetUserAction
|IGetUserFailedAction
|IGetUserSuccessAction
|IGetUserFinishedAction
|IUpdateUserAction
|IUpdateUserFailedAction
|IUpdateUserSuccessAction;

export const registerUserAction = (): IRegisterUserAction => ({
    type: REGISTER_USER_REQUEST
});
  
export const registerUserFailedAction = (): IRegisterUserFailedAction => ({
    type: REGISTER_USER_FAILED
});
  
export const registerUserSuccessAction = (): IRegisterUserSuccessAction => ({
    type: REGISTER_USER_SUCCESS,
});

export const loginAction = (): ILoginAction => ({
    type: LOGIN_USER_REQUEST
});
  
export const loginFailedAction = (): ILoginFailedAction => ({
    type: LOGIN_USER_FAILED
});
  
export const loginSuccessAction = (user: TUser): ILoginSuccessAction => ({
    type: LOGIN_USER_SUCCESS,
    user
});

export const logoutAction = (): ILogoutAction => ({
    type: LOGOUT_REQUEST
});
  
export const logoutFailedAction = (): ILogoutFailedAction => ({
    type: LOGOUT_FAILED
});
  
export const logoutSuccessAction = (): ILogoutSuccessAction => ({
    type: LOGOUT_SUCCESS
});

export const forgotPasswordAction = (): IForgotPasswordAction => ({
    type: FORGOT_PASSWORD_REQUEST
});
  
export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
    type: FORGOT_PASSWORD_FAILED
});
  
export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const resetPasswordAction = (): IResetPasswordAction => ({
    type: RESET_PASSWORD_REQUEST
});
  
export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
});
  
export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetErrorStatusAction = (): IResetErrorStatusAction => ({
    type: RESET_ERROR_STATUS
});

export const resetSuccessStatusAction = (): IResetSuccessStatusAction => ({
    type: RESET_SUCCESS_STATUS
});

export const getUserAction = (): IGetUserAction => ({
    type: GET_USER_REQUEST
});
  
export const getUserFailedAction = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED
});
  
export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    user
});

export const getUserFinishedAction = (): IGetUserFinishedAction => ({
    type: GET_USER_FINISHED
});

export const updateUserAction = (): IUpdateUserAction => ({
    type: UPDATE_USER_REQUEST
});
  
export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
    type: UPDATE_USER_FAILED
});
  
export const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    user
});

