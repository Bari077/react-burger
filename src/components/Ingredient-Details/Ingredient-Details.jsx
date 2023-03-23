import ingredientModalStyle from './Ingredient-Details.module.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const IngredientDetails =(props)=> {
    
    const ingredient = useSelector(state => state.ingredientModalReducer.ingredientDetails);
    const currentIngredient = props.data ? props.data : ingredient
    
    return(
        <>
            <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингредиента</p>
            <div className={ingredientModalStyle.item}>
                <img className={ingredientModalStyle.image} src={currentIngredient.image_large} alt={currentIngredient.name}/>
                <h3 className="text text_type_main-medium pt-4 pb-8">{currentIngredient.name}</h3>
                <div className={ingredientModalStyle.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал  <span className={ingredientModalStyle.span}>{currentIngredient.calories}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Белки, г  <span className={ingredientModalStyle.span}>{currentIngredient.proteins}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г  <span className={ingredientModalStyle.span}>{currentIngredient.fat}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г  <span className={ingredientModalStyle.span}>{currentIngredient.carbohydrates}</span></p>
                </div>
            </div>
        </>
    )
}

IngredientDetails.propTypes = {
    data : PropTypes.shape({
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
}

export default IngredientDetails;