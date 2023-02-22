const url = 'https://norma.nomoreparties.space/api/';

export default function checkResponse(response) {
    if(response.ok) {
        return response.json()
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`);    
};

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