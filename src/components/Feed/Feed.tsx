import feedStyle from './Feed.module.css';
import { OrderCard } from '../Order-Card/Order-Card';
import { startWsConnection, closeWsConnection } from '../../services/actions/ws-public';
import { useSelector, useDispatch } from '../../services/hooks';
import { useEffect, FC } from 'react';




export const Feed: FC =()=> {
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
    

    
    return (                    
        <>  
            {publicOrders &&      
            (<>
                <section className={feedStyle.section}>
                    <ul className={feedStyle.container}>
                        {ordersList ? ordersList.map((order, index)=> (
                            <OrderCard order={order} key={index}/>
                        )): null}                        
                    </ul>            
                </section>
                <section className={feedStyle.section}>                
                    <div className={feedStyle.ordersStatus}>
                        <div>
                            <p className="text text_type_main-medium mb-6">Готовы: </p>
                            <ul className={`${feedStyle.ordersStatusList} ${feedStyle.ordersDone}`}>
                                {ordersDone ? ordersDone.map((order, index)=> (
                                    index<20 && <li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>
                            )): null}
                            </ul>
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-6">В работе: </p>
                            <ul className={feedStyle.ordersStatusList}>
                                {ordersPending ? ordersPending.map((order, index)=> (
                                    index<20 && <li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>
                                )): null}
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium pt-15">Выполнено за все время: </p>
                    <span className="text text_type_digits-large">{publicOrders?.total}</span>
                    <p className="text text_type_main-medium pt-15">Выполнено за сегодня: </p>
                    <span className="text text_type_digits-large">{publicOrders?.totalToday}</span>                               
                </section>
            </>
            )}
            {wsError && <p className={`${feedStyle.error} text text_type_main-medium`}>Обновите страницу</p>}           
        </>
    )   
}