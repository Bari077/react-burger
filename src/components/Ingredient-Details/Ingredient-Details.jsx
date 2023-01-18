import PropTypes from 'prop-types';
import ingrdientModalStyle from './Ingredient-Details.module.css';

const IngredientDetails =({...props})=> {
    
    return(
        <>
            <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингредиента</p>
            <div className={ingrdientModalStyle.item}>
                <img className={ingrdientModalStyle.image} src={props.item.image_large} alt={props.item.name}/>
                <h3 className="text text_type_main-medium pt-4 pb-8">{props.item.name}</h3>
                <div className={ingrdientModalStyle.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал  <span className={ingrdientModalStyle.span}>{props.item.calories}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Белки, г  <span className={ingrdientModalStyle.span}>{props.item.proteins}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г  <span className={ingrdientModalStyle.span}>{props.item.fat}</span></p>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г  <span className={ingrdientModalStyle.span}>{props.item.carbohydrates}</span></p>
                </div>
            </div>
        </>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image_large: PropTypes.string,
        isVisible: PropTypes.bool,
        name: PropTypes.string,
        proteins: PropTypes.number
    }.isRequred)
}

export default IngredientDetails;