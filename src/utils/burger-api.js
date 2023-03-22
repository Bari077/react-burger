import { url } from "./utils";
import checkResponse from "./utils";

export function getIngredientsRequest() {
    return fetch(`${url}ingredients`)
      .then(checkResponse)           
  };

export const postOrder =(order)=> {
    return fetch(`${url}orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(checkResponse)
}

