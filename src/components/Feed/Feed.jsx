import feedStyle from './Feed.module.css';
import { OrderCard } from '../Order-Card/Order-Card';




export const Feed =()=> {
    

    return (
        <>
            <section className={feedStyle.section}>
                <div className={feedStyle.container}>
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>            
            </section>
            <section className={feedStyle.section}>                
                <div className={feedStyle.ordersStatus}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы: </p>
                        <ul className={`${feedStyle.ordersStatusList} ${feedStyle.ordersDone}`}>
                            <li className="text text_type_digits-default mb-2">12133</li>
                            <li className="text text_type_digits-default mb-2">432424</li>
                            <li className="text text_type_digits-default mb-2">2342232</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе: </p>
                        <ul className={feedStyle.ordersStatusList}>
                            <li className="text text_type_digits-default mb-2">12133</li>
                            <li className="text text_type_digits-default mb-2">432424</li>
                            <li className="text text_type_digits-default mb-2">2342232</li>
                        </ul>
                    </div>
                </div>
                <p className="text text_type_main-medium pt-15">Выполнено за все время: </p>
                <span className="text text_type_digits-large">28752</span>
                <p className="text text_type_main-medium pt-15">Выполнено за сегодня: </p>
                <span className="text text_type_digits-large">123</span>                               
            </section>
        </>        
    )
}