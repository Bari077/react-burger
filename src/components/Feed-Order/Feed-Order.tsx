import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle  from './Feed-Order.module.css';
import { useMemo, FC } from "react";
import { TFeedOrder, TIngredientDetails } from "../../services/types/data";

interface IFeedOrderProps {
    order: TFeedOrder;
    ingredients: Array<TIngredientDetails & { count: number}>
}

export const FeedOrder: FC<IFeedOrderProps> =({order, ingredients})=> {
    const { createdAt, name, number, status } = order;
    const orderTotal = useMemo(
        ()=>
        ingredients.reduce((total, ingredient) => (total += ingredient.price * ingredient.count),
        0
        ), [ingredients]
    )
    
    const orderStatus = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Создан'
    }

    return (
        <section className={feedOrderStyle.section}>
            <p className={`${feedOrderStyle.number} text text_type_digits-default mb-10`}># {number}</p>
            <h3 className="text text_type_main-medium mb-3">{name}</h3>
            <span className={`${status === 'done'? feedOrderStyle.status : null} text text_type_main-default`}>{orderStatus[status]}</span>                                            
            <p className="text text_type_main-medium pt-15 mb-6">Состав: </p>
            <ul className={feedOrderStyle.itemList}>
                {ingredients.map((item, index)=> (
                    <li className={feedOrderStyle.itemCard} key={index}>
                        <div className={feedOrderStyle.imageContainer}>
                            <img className={feedOrderStyle.image} alt={item.name} src={item.image}/>
                        </div>
                        <p className={`${feedOrderStyle.itemName} text text_type_main-default pl-4 pr-4`}>{item.name}</p>
                        <span className="text text_type_digits-default mr-2">{item.count}&nbsp;x&nbsp;{item.price}</span>
                        <CurrencyIcon type="primary" />
                    </li> 
                ))}                               
            </ul>
            <div className={feedOrderStyle.caption}>
                <time className={`${feedOrderStyle.time} text text_type_main-default text_color_inactive`} dateTime={createdAt}><FormattedDate date={new Date(createdAt)} /> i-GMT+3</time>
                <span className="text text_type_digits-default pr-2">{orderTotal}</span>
                <CurrencyIcon type="primary" />
            </div>
        </section>
    )
}