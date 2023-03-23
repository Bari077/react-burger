import { url, checkResponse, fetchWithRefresh } from "../utils";


export function getIngredientsRequest() {
    return fetch(`${url}ingredients`)
      .then(checkResponse)           
  };

export const postOrder =(order, accessToken)=> {    
    return fetchWithRefresh(`${url}orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        },
        body: JSON.stringify(order)
    })
}

