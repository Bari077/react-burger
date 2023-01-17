import React from 'react';
import ingrdientModalStyle from './Ingredient-Details.module.css';

const IngredientDetails =()=> {
    return(
        <>
            <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингредиента</p>
            <div className={ingrdientModalStyle.item}>
                <img className={ingrdientModalStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png"/>
                <h3 className="text text_type_main-medium pt-4 pb-8">Название</h3>
                <div className={ingrdientModalStyle.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал  <span className={ingrdientModalStyle.span}>200</span></p>
                    <p className="text text_type_main-small text_color_inactive">Белки, г  <span className={ingrdientModalStyle.span}>30</span></p>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г  <span className={ingrdientModalStyle.span}>15</span></p>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г  <span className={ingrdientModalStyle.span}>200</span></p>
                </div>
            </div>
        </>
    )
}

export default IngredientDetails;