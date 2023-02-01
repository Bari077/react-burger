import React from 'react';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/ingredientsContext';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';



const App =()=> { 

  const [state, setState] = React.useState(
    {
      isLoading: true,
      hasError: false,
      data: []
    }
  );  
  
     
  React.useEffect(()=> {    
    getIngredients()
    .then((res)=> {
      const data= res.data;
      setState({...state, data, isLoading: false})
    })
    .catch(()=> {
      setState({...state, hasError: true, isLoading: false})
    })      
  }, []
  );  
  
  const [constructorState, setConstructorState] = React.useState(
    {
        hasIngredients : false,
        hasBun : false,
        data : ''
    }
); 
  
  
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
                <IngredientsContext.Provider value={[state.data]}>
                  <BurgerConstructorContext.Provider value={{constructorState, setConstructorState}}>
                    <BurgerConstructor />
                  </BurgerConstructorContext.Provider> 
                </IngredientsContext.Provider>                  
              </div>        
            </main>      
        </div>      
      )}
    </>
  );
}

export default App;
