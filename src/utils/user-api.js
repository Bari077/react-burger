import { url } from "./utils";
import { setCookie } from "./utils";

import checkResponse from "./utils";


export async function refreshToken() {    
    const refToken = localStorage.getItem('refreshToken');
    const response = await fetch(`${url}auth/token`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ "token": refToken })
    })
    if (response.ok) {
        localStorage.removeItem('refreshToken');
        return response;                                
    }
    return await Promise.reject(`Что-то пошло не так: ${response.status}`);
}

export const fetchWithRefresh = async (url, options)=> {
    const response = await fetch(url, options);
    if(response.ok) {
        const data = await response.json();
        return data
    } else {
        const error = await response.json();        
        if (error.message === 'jwt expired') {
            refreshToken().then(checkResponse)
            .then(res=> {
                options.headers.authorization = res.accessToken;
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie('accessToken', res.accessToken);
            })
            const response = await fetch(url, options);
            if(response.ok) {
            const data = await response.json();
            console.log(data)
            return data      
            } else {return Promise.reject(response.status)}
        }           
        return Promise.reject(error.message) 
    }    
}

export const getUserRequest =(accessToken)=> {    
    return fetchWithRefresh(`${url}auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        }
    })
}
    
export const updateUserRequest =(user, accessToken)=> {    
    return fetch(`${url}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        },
        body: JSON.stringify(user)
    }).then(checkResponse)
}

