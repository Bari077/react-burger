import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle  from './Feed-Order.module.css';

export const FeedOrder =()=> {
    return (
        <section className={feedOrderStyle.section}>
            <p className={`${feedOrderStyle.number} text text_type_digits-default mb-10`}># 034543</p>
            <h3 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h3>
            <span className="text text_type_main-default">Выполнен</span>
            <p className="text text_type_main-medium pt-15 mb-6">Состав: </p>
            <ul className={feedOrderStyle.itemList}>
                <li className={feedOrderStyle.itemCard}>
                    <div className={feedOrderStyle.imageContainer}>
                        <img className={feedOrderStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png"/>
                    </div>
                    <p className={`${feedOrderStyle.itemName} text text_type_main-default pl-4 pr-4`}>Флюоресцентная булка R2-D3</p>
                    <span className="text text_type_digits-default mr-2">480</span>
                    <CurrencyIcon type="primary" />
                </li>
                <li className={feedOrderStyle.itemCard}>
                    <div className={feedOrderStyle.imageContainer}>
                        <img className={feedOrderStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png"/>
                    </div>
                    <p className={`${feedOrderStyle.itemName} text text_type_main-default pl-4 pr-4`}>Флюоресцентная булка R2-D3</p>
                    <span className="text text_type_digits-default mr-2">2&nbsp;х&nbsp;480</span>
                    <CurrencyIcon type="primary" />
                </li>
                <li className={feedOrderStyle.itemCard}>
                    <div className={feedOrderStyle.imageContainer}>
                        <img className={feedOrderStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png"/>
                    </div>
                    <p className={`${feedOrderStyle.itemName} text text_type_main-default pl-4 pr-4`}>Флюоресцентная булка R2-D3</p>
                    <span className="text text_type_digits-default mr-2">2&nbsp;х&nbsp;480</span>
                    <CurrencyIcon type="primary" />
                </li>
                <li className={feedOrderStyle.itemCard}>
                    <div className={feedOrderStyle.imageContainer}>
                        <img className={feedOrderStyle.image} src="https://code.s3.yandex.net/react/code/bun-02.png"/>
                    </div>
                    <p className={`${feedOrderStyle.itemName} text text_type_main-default pl-4 pr-4`}>Флюоресцентная булка R2-D3</p>
                    <span className="text text_type_digits-default mr-2">2&nbsp;х&nbsp;480</span>
                    <CurrencyIcon type="primary" />
                </li>
            </ul>
            <div className={feedOrderStyle.caption}>
                <time className={`${feedOrderStyle.time} text text_type_main-default text_color_inactive`}>Вчера, 13:50 i-GMT+3</time>
                <span className="text text_type_digits-default pr-2">960</span>
                <CurrencyIcon type="primary" />
            </div>
        </section>
    )
}