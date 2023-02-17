import React, { useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../Ingredient/Ingredient';
import burgerIngredientsStyle from './Burger-Ingredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Ingredient-Details/Ingredient-Details';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentItem, REMOVE_INGREDIENT_DETAILS } from '../../services/actions/index';




const BurgerIngredients =()=> {
    const ingredients = useSelector(state => state.ingredientsReducer.items);
    const dispatch = useDispatch();     
    const [current, setCurrent] = React.useState('one');
    const [isShowModal, setIsShowModal] = React.useState(false);
    
    const handleOpenModal =(item)=> {
        dispatch(setCurrentItem(item));        
        setIsShowModal({ visible: true });                             
    }
 
    const handleCloseModal =()=> {
        setIsShowModal({ visible: false });
        dispatch({ type: REMOVE_INGREDIENT_DETAILS });        
    }
    

    const containerPosition = useRef();
    const bunPosition = useRef();
    const saucePosition = useRef();
    const mainPosition = useRef();

    const handleScroll =()=> {        
        const sauceSpace = containerPosition.current.getBoundingClientRect().top - saucePosition.current.getBoundingClientRect().top;
        const mainSpace = containerPosition.current.getBoundingClientRect().top - mainPosition.current.getBoundingClientRect().top;
        if(0 < sauceSpace && mainSpace < 0) {
            setCurrent('two')
        } else if (mainSpace > 0) {
            setCurrent('three');
        } else {
            setCurrent('one');
        }      
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
          };       
    }, []);

    const modal = (
        <Modal onClose={handleCloseModal} > 
           <IngredientDetails />
        </Modal>
    );   
    

    
    return(
        <section className={burgerIngredientsStyle.section}>                
            <div style={{ display: 'flex' }} >
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
            <article className={burgerIngredientsStyle.container} ref={containerPosition}>
                <h3 className="text text_type_main-medium pt-10" ref={bunPosition}>Булки</h3>
                <ul className={burgerIngredientsStyle.list}>
                    {ingredients.map((item) => 
                        item.type === 'bun' && (
                            <Ingredient ingredient={item} key={item._id} handleOpenModal={handleOpenModal}/>                                                 
                        )                                                                       
                    )} 
                                                      
                </ul>
                <h3 className="text text_type_main-medium pt-10" ref={saucePosition}>Соусы</h3>
                <ul className={burgerIngredientsStyle.list}>
                {ingredients.map((item) => 
                        item.type === 'sauce' && (
                            <Ingredient ingredient={item} key={item._id} handleOpenModal={handleOpenModal}/> 
                        )                        
                    )}                                     
                </ul> 
                <h3 className="text text_type_main-medium pt-10" ref={mainPosition}>Начинки</h3>
                <ul className={burgerIngredientsStyle.list}>
                {ingredients.map((item) => 
                        item.type === 'main' && (
                            <Ingredient ingredient={item} key={item._id} handleOpenModal={handleOpenModal}/> 
                        )                        
                    )}                                     
                </ul>
            </article>
            {isShowModal.visible && modal}                                                                             
        </section>
    )
}


export default BurgerIngredients;