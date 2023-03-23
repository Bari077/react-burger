import { url, checkResponse } from "../utils";


export const registerUserRequest = async (form)=> {    
    return await fetch(`${url}auth/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}

export const forgotPasswordRequest = async (mail)=> {    
    return await fetch(`${url}password-reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"mail" : mail}) 
    }).then(checkResponse)
}

export const resetPasswordRequest = async (form)=> {
     
    return await fetch(`${url}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}

export const loginRequest = async (form)=> {    
    return await fetch(`${url}auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse)
}



export const logoutRequest = async (token)=> {
    return await fetch(`${url}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"token" : token})
    }).then(checkResponse)
}