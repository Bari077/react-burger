import { OrderCard } from "../Order-Card/Order-Card";
import orderListStyle from './Order-List.module.css';
import { startPrivateWsConnection, closePrivateWsConnection } from "../../services/actions/ws-private";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";
import { Notification } from "../Notification/Notification";

export const OrderList =()=> {

    const { userOrders, wsPrivateError } = useSelector(state => state.wsPrivateReducer );
    const token = getCookie('accessToken').split('Bearer ')[1];
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(startPrivateWsConnection(token));

        return ()=> {
            dispatch(closePrivateWsConnection())
        }
    }, [])

    const ordersList = userOrders?.orders;
    
    

    if(userOrders) {
        return (
            ordersList.length ?       
            <section className={orderListStyle.section}>
                <ul className={orderListStyle.container}>
                    {ordersList.map((order, index)=> (
                        <OrderCard order={order} key={index}/>
                    ))}                  
                </ul>            
            </section> :
            <p className="text text_type_main-medium pl-30 pt-30"> Заказы не найдены</p>
        )
    } else if(wsPrivateError) {
        return (
            <Notification>Обновите страницу</Notification>
        )
    }       
}