import React from 'react';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';




const App =()=> { 
  const [state, setState] = React.useState(
    {
      isLoading: true,
      hasError: false,
      data: []
    });

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  React.useEffect(()=> {
    const getIngredients = ()=> {
      fetch(url)
        .then(response=> {
          if(response.ok) {
            return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`);  
        })
        .then((res)=> {
          const data= res.data;
          setState({...state, data, isLoading: false})
        })
        .catch(()=> {
          setState({...state, hasError: true, isLoading: false})
        })
         
    }
    getIngredients();    
  }, [])
  
  
  return (
    <>
    {state.isLoading && 'Загрузка...'}
    {state.hasError && 'Произошла ошибка'}
    {!state.isLoading && !state.hasError && state.data.length && (
      <>      
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
      </>
      )}
    </>
  );
}

export default App;
