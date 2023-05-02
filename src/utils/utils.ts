import { TRefreshTokenResponse } from "../services/types/api";


export const url = 'https://norma.nomoreparties.space/api/';
export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export function checkResponse(response: Response) {  
    if(response.ok) {      
        return response.json()        
    }       
  return Promise.reject(`Что-то пошло не так: ${response.status}`);    
}

export async function refreshToken(refToken: string): Promise<TRefreshTokenResponse> {
  const response = await fetch(`${url}auth/token`, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({ "token": refToken })
  })
  if (response.ok) {
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', null, {'max-age' : -1});
    return response.json()                                
  }
  return await Promise.reject(`Что-то пошло не так: ${response.status}`);
}

export const fetchWithRefresh = async (
  url: string, 
  options: {
    method: string;
    headers: {
        'Content-type': 'application/json';
        authorization : string;
    }
    body?: string
  })=> {
  const response = await fetch(url, options);
  if(response.ok) {
      const data = await response.json();
      return data
  } else {
      const error = await response.json();
      const token = localStorage.getItem('refreshToken');         
      if(token && error.message === 'jwt expired') {
        refreshToken(token)
        .then(res=> {              
          options.headers.authorization = res.accessToken;
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken, {});
          return fetch(url, options)                                 
        })                   
      } else {
        return error
      } 
  }    
}

export function setCookie(name: string, value: any, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
} 

export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}



