import PropTypes from 'prop-types';

export const url = 'https://norma.nomoreparties.space/api/';

export function checkResponse(response) {  
    if(response.ok) {      
        return response.json()        
    }       
  return Promise.reject(`Что-то пошло не так: ${response.status}`);    
}

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
      setCookie('accessToken', "", {'max-age' : -1});
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

export function setCookie(name, value, props) {
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

export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};


export const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,   
}).isRequired





  
