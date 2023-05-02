import React, { useEffect, useRef, useState, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../Ingredient/Ingredient';
import burgerIngredientsStyle from './Burger-Ingredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Ingredient-Details/Ingredient-Details';
import { useSelector, useDispatch } from '../../services/hooks';
import { setCurrentItem, REMOVE_INGREDIENT_DETAILS  } from '../../services/actions/ingredient-modal';
import { TIngredientDetails } from '../../services/types/data';




const BurgerIngredients: FC =()=> {
    const ingredients = useSelector(state => state.ingredientsReducer.items);
    const dispatch = useDispatch();     
    const [current, setCurrent] = useState('one');
    const [isShowModal, setIsShowModal] = useState({ visible: false });
    const currentIngredient = JSON.parse(sessionStorage.getItem('currentIngredient') || 'false')
    
    useEffect(()=> {
        if(currentIngredient) {
            dispatch(setCurrentItem(currentIngredient));
            setIsShowModal({ visible: true });
            window.history.replaceState(null, "", `/ingredients/${currentIngredient._id}`);            
        }
    },[])
    
    
    const handleOpenModal =(item: TIngredientDetails)=> {
        window.history.replaceState(null, "", `ingredients/${item._id}`);
        setIsShowModal({ visible: true });
        sessionStorage.setItem('currentIngredient', JSON.stringify(item));
        dispatch(setCurrentItem(item));                                     
    }
 
    const handleCloseModal =()=> {
        setIsShowModal({ visible: false });
        dispatch({ type: REMOVE_INGREDIENT_DETAILS });
        sessionStorage.removeItem('currentIngredient');
        window.history.replaceState(null, "", `/`)        
    }
    

    const containerPosition = useRef<HTMLElement>(null);
    const bunPosition = useRef<HTMLHeadingElement>(null);
    const saucePosition = useRef<HTMLHeadingElement>(null);
    const mainPosition = useRef<HTMLHeadingElement>(null);

    const handleScroll =()=> { 
        if(containerPosition.current !== null && saucePosition.current !== null && mainPosition.current !== null) {
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
              
    }

    useEffect(() => {        
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
          };       
    }, []);

    const modal = (
        <Modal onClose={handleCloseModal} > 
           <IngredientDetails data = {null}/>
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