import { url, checkResponse, fetchWithRefresh } from "../utils"


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

