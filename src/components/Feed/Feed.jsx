import feedStyle from './Feed.module.css';
import { OrderCard } from '../Order-Card/Order-Card';
import { startWsConnection, closeWsConnection } from '../../services/actions/ws-public';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Notification } from '../Notification/Notification';




export const Feed =()=> {
    const dispatch = useDispatch();
    const { publicOrders, wsError } = useSelector(state => state.wsPublicReducer );
    useEffect(()=> {
        dispatch(startWsConnection());

        return ()=> {
            dispatch(closeWsConnection());
        }
    }, [])

    

    const ordersDone = publicOrders?.orders.filter((order)=> order.status === 'done');
    const ordersPending = publicOrders?.orders.filter((order)=> order.status === 'pending');
    const ordersList = publicOrders?.orders;
    

    if(publicOrders) {
        return (
            <>
                <section className={feedStyle.section}>
                    <ul className={feedStyle.container}>
                        {ordersList.map((order, index)=> (
                            <OrderCard order={order} key={index}/>
                        ))}                        
                    </ul>            
                </section>
                <section className={feedStyle.section}>                
                    <div className={feedStyle.ordersStatus}>
                        <div>
                            <p className="text text_type_main-medium mb-6">Готовы: </p>
                            <ul className={`${feedStyle.ordersStatusList} ${feedStyle.ordersDone}`}>
                                {ordersDone.map((order, index)=> (
                                    index<20 && <li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-6">В работе: </p>
                            <ul className={feedStyle.ordersStatusList}>
                                {ordersPending.map((order, index)=> (
                                    index<20 && <li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium pt-15">Выполнено за все время: </p>
                    <span className="text text_type_digits-large">{publicOrders.total}</span>
                    <p className="text text_type_main-medium pt-15">Выполнено за сегодня: </p>
                    <span className="text text_type_digits-large">{publicOrders.totalToday}</span>                               
                </section>
            </>        
        )
    } else if(wsError) {
        return (
            <Notification>Обновите страницу</Notification>
        )
    }   
}