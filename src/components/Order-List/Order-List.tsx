import { OrderCard } from "../Order-Card/Order-Card";
import orderListStyle from './Order-List.module.css';
import { startPrivateWsConnection, closePrivateWsConnection } from "../../services/actions/ws-private";
import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from "../../services/hooks";
import { getCookie } from "../../utils/utils";
import { Notification } from "../Notification/Notification";

export const OrderList: FC =()=> {

    const { userOrders, wsPrivateError } = useSelector(state => state.wsPrivateReducer );
    const token = getCookie('accessToken')?.split('Bearer ')[1];
    const dispatch = useDispatch();
    useEffect(()=> {
        token && dispatch(startPrivateWsConnection(token));

        return ()=> {
            dispatch(closePrivateWsConnection())
        }
    }, [])

    const ordersList = userOrders?.orders;  
    

    
    return (
        <>
            {userOrders && 
            (ordersList?.length ?       
            <section className={orderListStyle.section}>
                <ul className={orderListStyle.container}>
                    {ordersList.map((order, index)=> (
                        <OrderCard order={order} key={index}/>
                    ))}                  
                </ul>            
            </section> :
            <p className="text text_type_main-medium pl-30 pt-30"> Заказы не найдены</p>)}
            {wsPrivateError && <p className="text text_type_main-medium pl-30 pt-30">Обновите страницу</p>}
        </>
                
    )          
}