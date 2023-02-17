import ingrdientModalStyle from './Ingredient-Details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails =()=> {
    const currentIngredient = useSelector(state => state.ingredientModalReducer.ingredientDetails);
    return(
        <>
            <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингредиента</p>
            <div className={ingrdientModalStyle.item}>
                <img className={ingrdientModalStyle.image} src={currentIngredient.image_large} alt={currentIngredient.name}/>
                <h3 className="text text_type_main-medium pt-4 pb-8">{currentIngredient.name}</h3>
                <div className={ingrdientModalStyle.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал  <span className={ingrdientModalStyle.span}>{currentIngredient.calories}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Белки, г  <span className={ingrdientModalStyle.span}>{currentIngredient.proteins}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г  <span className={ingrdientModalStyle.span}>{currentIngredient.fat}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г  <span className={ingrdientModalStyle.span}>{currentIngredient.carbohydrates}</span></p>
                </div>
            </div>
        </>
    )
}


export default IngredientDetails;