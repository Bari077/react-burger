import orderStyle from './Order-Details.module.css';
import doneImg from '../../images/done.svg';


const OrderDetails =()=> {
    return(
        <div className={orderStyle.container}>
            <p className="text text_type_digits-large pt-30">034536</p>
            <p className="text text_type_main-medium pt-8 mb-15">идентификатор заказа</p>
            <img className={orderStyle.image} src={doneImg} alt="Подтверждено" />
            <p className="text text_type_main-small pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;