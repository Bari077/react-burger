import { url, checkResponse, fetchWithRefresh } from "../utils";
import { TIngredientsResponse } from "../../services/types/api";
import { TOrderDetails } from "../../services/types/data";


export function getIngredientsRequest(): Promise<TIngredientsResponse> {
    return fetch(`${url}ingredients`)
      .then(checkResponse)           
  };

export const postOrder =(order: Array<string>, accessToken: string): Promise<TOrderDetails>=> {    
    return fetchWithRefresh(`${url}orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            authorization : accessToken
        },
        body: JSON.stringify({
            ingredients: order})
    })
}

