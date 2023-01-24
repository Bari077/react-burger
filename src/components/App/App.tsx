import React from 'react';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import {getIngredients}  from '../../utils/utils';



const App =()=> { 
  const [state, setState] = React.useState(
    {
      isLoading: true,
      hasError: false,
      data: []
    });

  
  React.useEffect(()=> {    
    getIngredients({setState, state});    
  }, [state])
  
  
  return (
    <>
    {state.isLoading && 'Загрузка...'}
    {state.hasError && 'Произошла ошибка'}
    {!state.isLoading && !state.hasError && state.data.length && (
           
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
      )}
    </>
  );
}

export default App;
