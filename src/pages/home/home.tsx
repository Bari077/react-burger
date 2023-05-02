import { useSelector } from '../../services/hooks';
import AppHeader from '../../components/App-Header/App-Header';
import BurgerIngredients from '../../components/Burger-Ingrdients/Burger-Ingredients';
import BurgerConstructor from '../../components/Burger-Constructor/Burger-Constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export function HomePage() : JSX.Element {
    const itemsRequest = useSelector(state => state.ingredientsReducer.itemsRequest);
    const itemsFailed = useSelector(state => state.ingredientsReducer.itemsFailed);


    return (
    <>    
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