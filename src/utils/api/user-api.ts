import { url, checkResponse, fetchWithRefresh } from "../utils"
import { TUser } from "../../services/types/data"
import { TUserResponse } from "../../services/types/api"

export const getUserRequest =(accessToken: string)=> {    
    return fetchWithRefresh(`${url}auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        }
    })
}
    
export const updateUserRequest =(user: TUser & { password?: string}, accessToken: string): Promise<TUserResponse> => {    
    return fetch(`${url}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        },
        body: JSON.stringify(user)
    }).then(checkResponse)
}

