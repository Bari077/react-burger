import AppHeader from '../../components/App-Header/App-Header';
import orderPageStyle from './order.module.css'
import { FeedOrder } from '../../components/Feed-Order/Feed-Order';
import { useParams, useLocation } from 'react-router-dom';
import { startWsConnection, closeWsConnection } from '../../services/actions/ws-public';
import { startPrivateWsConnection, closePrivateWsConnection } from '../../services/actions/ws-private';
import { useSelector, useDispatch } from '../../services/hooks';
import { useEffect, useMemo, FC } from 'react';
import { getCookie } from '../../utils/utils';
import { TIngredientDetails } from '../../services/types/data';

export const OrderPage: FC =(): JSX.Element => {
    const {pathname} = useLocation();
    const {id} = useParams();
    const dispatch = useDispatch();
    const token = getCookie('accessToken')?.split('Bearer ')[1];
    const handleWsConnection =()=> {
      token && pathname.startsWith('/profile/orders')?
      dispatch(startPrivateWsConnection(token)) : dispatch(startWsConnection());
    } 
    const handleCloseWs =()=> {
      pathname.startsWith('/profile/orders')?
      dispatch(closePrivateWsConnection()) : dispatch(closeWsConnection());
    } 
    const { publicOrders, wsError } = useSelector(state => state.wsPublicReducer );
    const { userOrders, wsPrivateError } = useSelector(state => state.wsPrivateReducer );
    const ingredientsList = useSelector(state=> state.ingredientsReducer.items);    
    const ordersList = pathname.startsWith('/profile/orders')?
    userOrders?.orders : publicOrders?.orders;
    useEffect(()=> {
        
      handleWsConnection();

        return ()=> {
          handleCloseWs();
        }
    }, [])

    const currentOrder = ordersList?.find((item)=> item.number === Number(id));
    const ingredients = currentOrder?.ingredients;


    
    const currentOrderIngredients = useMemo(() => {
        if(ingredients) {
            const orderIngredientsList = ingredients.reduce((arr: Array<TIngredientDetails>, ingredient) => {
                const isIngredient = ingredientsList.find((ingredientToFind) => ingredientToFind._id === ingredient);
                return isIngredient ? [...arr, isIngredient] : arr;
              }, []);
              
              const ingredientsCount = orderIngredientsList.reduce((arr: Array<TIngredientDetails & {count : number}>, ingredient) => {
                  let currentIngredient = arr.find(
                    (arrIngrredient) => arrIngrredient._id === ingredient._id
                  );
                  if (currentIngredient) {
                    currentIngredient.count += 1;
                  } else {
                    let currentIngredient = {
                      count: 1,
                      ...ingredient,
                    };
                    arr.push(currentIngredient);
                  }
                  return arr;
                }, []);
                return ingredientsCount;
        }       

    }, [ingredients, ingredientsList])


    return (
      <>
        <div className="App">
            <AppHeader />
            {currentOrderIngredients && ingredients &&
            <main className="main">                
              <FeedOrder order={currentOrder} ingredients={currentOrderIngredients}/>                             
            </main>}            
        </div>
        {(wsError || wsPrivateError ) && <p className={`${orderPageStyle.error} text text_type_main-medium pt-20`}>Обновите страницу</p>}
      </>        
    )
}
