import { url } from "../global/global";
import PropTypes from 'prop-types';

export default function checkResponse(response) {
    if(response.ok) {
        return response.json()
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`);    
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
})

export const getIngredients = ({setState, state})=> {
    fetch(url)
      .then(response=> checkResponse(response))
      .then((res)=> {
        const data= res.data;
        setState({...state, data, isLoading: false})
      })
      .catch(()=> {
        setState({...state, hasError: true, isLoading: false})
      })
       
  }

