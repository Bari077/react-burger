import React from 'react';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import { ingredientsData } from '../../utils/data';


function App() {  
  return (    
    <div className="App">
      <AppHeader />
      <main className="main">
        <h2 className="text text_type_main-large pl-5 pb-5">Соберите бургер</h2>
        <div className="content">          
          <BurgerIngredients data={ingredientsData}/>
          <BurgerConstructor data={ingredientsData}/>
        </div>        
      </main>      
    </div>
  );
}

export default App;
