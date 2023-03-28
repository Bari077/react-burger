import { OrderCard } from "../Order-Card/Order-Card";
import orderListStyle from './Order-List.module.css';

export const OrderList =()=> {
    return (        
            <section className={orderListStyle.section}>
                <div className={orderListStyle.container}>
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>            
            </section>
    )
}