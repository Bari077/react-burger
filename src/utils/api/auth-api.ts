import { url, checkResponse } from "../utils";
import { TAuthUser, TUser } from "../../services/types/data";
import { TAuthResponse, TMessageResponse } from "../../services/types/api";

export const registerUserRequest = async (form: TAuthUser): Promise<TAuthResponse> => {    
    return await fetch(`${url}auth/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}

export const forgotPasswordRequest = async (mail: Omit<TUser, 'name'>): Promise<TMessageResponse> => {    
    return await fetch(`${url}password-reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"mail" : mail}) 
    }).then(checkResponse)
}

export const resetPasswordRequest = async (form: Omit<TAuthUser, 'email' | 'name'> & { token: string}): Promise<TMessageResponse> => {
     
    return await fetch(`${url}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}

export const loginRequest = async (form: Omit<TAuthUser, 'name'>): Promise<TAuthResponse> => {    
    return await fetch(`${url}auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}



export const logoutRequest = async (token: string): Promise<TMessageResponse> => {
    return await fetch(`${url}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"token" : token})
    }).then(checkResponse)
}