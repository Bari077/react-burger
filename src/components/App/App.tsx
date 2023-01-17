import React from 'react';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import { ingredientsData } from '../../utils/data';


const App =()=> { 
  const [state, setState] = React.useState(
    {
      hasError: false,
      data: []
    });

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  React.useEffect(()=> {
    const getIngredients = async ()=> {
      const res = await fetch(url);
      const data = await res.json();
      setState({...data});   
    }
    getIngredients();    
  }, [])
  
  
  return (    
    <body>
      <div className="App">
        <AppHeader />
          <main className="main">
            <h2 className="text text_type_main-large pl-5 pb-5">Соберите бургер</h2>
            <div className="content">          
              <BurgerIngredients ingredients={state.data}/>
              <BurgerConstructor data={state.data}/>   
            </div>        
          </main>      
      </div>
      <div id="react-modals"></div>
    </body>
  );
}

export default App;
