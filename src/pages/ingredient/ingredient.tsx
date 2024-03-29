import AppHeader from '../../components/App-Header/App-Header';
import IngredientDetails from '../../components/Ingredient-Details/Ingredient-Details';
import { useSelector, useDispatch } from '../../services/hooks';
import { getItems } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import styles from './ingredient.module.css';
import { Navigate, useParams } from 'react-router-dom';

export function IngredientPage(): JSX.Element {
    
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredientsReducer.items);
    const {id} = useParams();
    

    useEffect(()=> {                  
        dispatch(getItems());                                                                                      
    },[])
    
    const ingredient = ingredients.find(item=> item._id === id)

    const ingredientInStorage = JSON.parse(sessionStorage.getItem('currentIngredient') || 'false') 
       
    if(ingredientInStorage) {
        return <Navigate to="/" replace/>
    }

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <div className={styles.container}>
                    {ingredient && 
                    <IngredientDetails data={ingredient} />}
                </div>            
            </main>            
        </div>
    )
}