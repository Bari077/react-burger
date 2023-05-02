import { useState, useMemo, FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorCard } from '../Constructor-Card/Constructor-Card';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyle from './Burger-Constructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../Order-Details/Order-Details';
import { useSelector, useDispatch } from '../../services/hooks';
import { sendOrder, REMOVE_ORDER_DETAILS } from '../../services/actions/order';
import { addItem } from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { TIngredientDetails } from '../../services/types/data';



const BurgerConstructor : FC =()=> {     
    
    const [isShowModal, setIsShowModal] = useState({visible: false});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    const bun = useSelector(state=> state.constructorReducer.bun);
    const orderRequest = useSelector(state=> state.orderReducer.orderRequest);
    const orderFailed = useSelector(state=> state.orderReducer.orderFailed);
    const userInfo = useSelector(state=> state.authReducer.user);
 
    
    useMemo(()=> {
        if(bun) {
            localStorage.setItem('bun', JSON.stringify(bun));
        }        
        if(constructorIngredients.length) {
            localStorage.setItem('constructorIngredients', JSON.stringify(constructorIngredients))
        } else {
            localStorage.removeItem('constructorIngredients')
        }
    },[bun, constructorIngredients])

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredientDetails) {
            dispatch(addItem(item));                                    
        },
        collect: monitor  => ({            
            isHover: monitor.getItemType() !==bun ? monitor.isOver() : null,
        }),                                     
    })
    
    const totalPrice = useMemo(() => {
        const bunCost = bun? bun.price *2 : 0;
        return constructorIngredients.reduce((sum, item) => sum + item.price, bunCost)
    }, [bun, constructorIngredients])  

    const handleOpenModal =()=> {       
        setIsShowModal({ visible: true });
    }
 
    const handleCloseModal =()=> {
        setIsShowModal({ visible: false });
        dispatch({ type: REMOVE_ORDER_DETAILS });
    }

    const confirmOrder =()=> {
        if(!userInfo) {            
            navigate('login', {state: {from: '/'}})
        } else {
            const orderList = [bun?._id, ...constructorIngredients.map(ingredient => ingredient._id), bun?._id]; 
            dispatch(sendOrder(orderList));
            if(!orderRequest || !orderFailed) {
            handleOpenModal();                                   
        }
        }       
    }
   
    const modal = (
        <Modal onClose={handleCloseModal} >            
            <OrderDetails />           
        </Modal>
    );    
      
    const listClass = `${burgerStyle.list} ${isHover ? burgerStyle.onHover : ''}`

    return(

        <section className={burgerStyle.section}>
            <div className={burgerStyle.container} ref={dropTarget}>
                <div className="pl-8 pb-4">
                    {bun  ? 
                    (
                        <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        key={bun._id}
                        />
                    )  :  <p className="text text_type_main-medium pl-6 pt-10">Перенесите булку для бургера сюда</p>                  
                    }                                        
                </div>
                <ul className={`${listClass}`}>
                    {bun && constructorIngredients.length === 0 && !isHover ? <p className="text text_type_main-medium pl-8 pt-30">Перенесите желаемые ингредиенты сюда</p>  : constructorIngredients.map((item, index)=> 
                    item.type !== 'bun' &&
                    (
                    <ConstructorCard item={item} index={index} key={index}/>                
                    ))}
                </ul>                
                <div className="pt-4 pl-8">
                        {bun &&
                        <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        key={bun._id}
                        />}                 
                </div>
            </div>
            <div className={burgerStyle.total}>
                <p className="text text_type_digits-medium pr-3">{totalPrice}</p>
                <div className={burgerStyle.order} > <CurrencyIcon type="primary" /></div>                
                <Button htmlType="button" type="primary" size="large" onClick={confirmOrder} disabled = {!bun || constructorIngredients.length === 0} >
                    Оформить заказ
                </Button>
            </div>            
            {isShowModal.visible && modal}        
        </section>
    )
}



export default BurgerConstructor;