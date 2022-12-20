import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/App-Header/App-Header';
import BurgerIngredients from './components/Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from './components/Burger-Constructor/Burger-Constructor';
import { ingredientsData } from './utils/data';


function App() {  
  return (    
    <div className="App">
      <AppHeader />
      <main className="main">
        <BurgerIngredients data={ingredientsData}/>
        <BurgerConstructor />
      </main>  
      
    </div>
  );
}

export default App;
