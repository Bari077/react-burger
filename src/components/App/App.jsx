import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import { getItems } from '../../services/actions/index';
import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



const App =()=> {   
  
  const itemsRequest = useSelector(state => state.ingredientsReducer.itemsRequest);
  const itemsFailed = useSelector(state => state.ingredientsReducer.itemsFailed);
  const dispatch = useDispatch();
  
  
  useEffect(()=> {    
    dispatch(getItems());
  },[])  
    
  
  return (
    <>
    {itemsRequest && 'Загрузка...'}
    {itemsFailed && 'Произошла ошибка'}
    {!itemsRequest && !itemsFailed && (
           
        <div className="App">
          <AppHeader />
            <main className="main">
              <h2 className="text text_type_main-large pl-5 pb-5">Соберите бургер</h2>
              <DndProvider backend={HTML5Backend}>
                <div className="content">                          
                  <BurgerIngredients />
                  <BurgerConstructor />                                  
                </div>
              </DndProvider>                      
            </main>      
        </div>      
      )}
    </>
  );
}

export default App;
