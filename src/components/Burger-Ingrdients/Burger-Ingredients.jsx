import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './Burger-Ingredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Ingredient-Details/Ingredient-Details';
import { ingredientsPropTypes } from '../../utils/utils';




const BurgerIngredients =(props)=> {
    const [current, setCurrent] = React.useState('one');
    const [modalState, setModal] = React.useState({visible : false});
    const [currentIngredient, setCurrentIngredient] = React.useState();
    const handleOpenModal =(index)=> {
        setCurrentIngredient(props.ingredients[index]);
        setModal({ visible: true });                       
    }
 
    const handleCloseModal =()=> {
        setModal({ visible: false });        
    }
    
    const modal = (
        <Modal onClose={handleCloseModal} > 
           <IngredientDetails item={currentIngredient}/>
        </Modal>
    );

    return(
        <section className={burgerIngredientsStyle.section}>                
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>
            <article className={burgerIngredientsStyle.container}>
                <h3 className="text text_type_main-medium pt-10">Булки</h3>
                <ul className={burgerIngredientsStyle.list}>
                    {props.ingredients.map((item) => 
                        item.type === 'bun' && (
                            <li className={burgerIngredientsStyle.item} key={item._id} onClick={()=> handleOpenModal(props.ingredients.indexOf(item))}>           
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
                                <div className={burgerIngredientsStyle.price}>
                                    <span className="text text_type_digits-default pr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>                        
                                <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
                            </li>                                                        
                        )                                                                       
                    )} 
                                                      
                </ul>
                <h3 className="text text_type_main-medium pt-10">Соусы</h3>
                <ul className={burgerIngredientsStyle.list}>
                {props.ingredients.map((item) => 
                        item.type === 'sauce' && (
                            <li className={burgerIngredientsStyle.item} key={item._id} onClick={()=> handleOpenModal(props.ingredients.indexOf(item))}>            
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
                                <div className={burgerIngredientsStyle.price}>
                                    <span className="text text_type_digits-default pr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>                        
                                <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
                            </li>
                        )                        
                    )}                                     
                </ul> 
                <h3 className="text text_type_main-medium pt-10">Начинки</h3>
                <ul className={burgerIngredientsStyle.list}>
                {props.ingredients.map((item) => 
                        item.type === 'main' && (
                            <li className={burgerIngredientsStyle.item} key={item._id} onClick={()=> handleOpenModal(props.ingredients.indexOf(item))}>            
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
                                <div className={burgerIngredientsStyle.price}>
                                    <span className="text text_type_digits-default pr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>                        
                                <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
                            </li>
                        )                        
                    )}                                     
                </ul>
            </article>
            {modalState.visible && modal}                                                                             
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired
}

export default BurgerIngredients;