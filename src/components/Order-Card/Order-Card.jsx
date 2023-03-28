import cardStyle from './Order-Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderCard = ()=> {
    
    return (
        <article className={cardStyle.card}>
            <div className={cardStyle.id}>
                <p className="text text_type_digits-default">#034535</p>
                <time className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</time>
            </div>            
            <h3 className="text text_type_main-medium mb-6">Death Star Burger</h3>
            <div className={cardStyle.details}>
                <ul className={cardStyle.itemList}>
                    <li className={cardStyle.imageContainer}><img className={cardStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png" /></li>
                    <li className={cardStyle.imageContainer}><img className={cardStyle.image} src="https://code.s3.yandex.net/react/code/meat-01.png" /></li>
                    <li className={cardStyle.imageContainer}><img className={cardStyle.image} src="https://code.s3.yandex.net/react/code/mineral_rings.png" /></li>
                </ul>
                <span className="text text_type_digits-default pr-2">480</span>
                <CurrencyIcon type="primary" />
            </div>
        </article>
    )
}