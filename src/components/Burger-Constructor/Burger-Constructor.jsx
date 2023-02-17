import React, { useState, useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorCard } from '../Constructor-Card/Constructor-Card';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyle from './Burger-Constructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../Order-Details/Order-Details';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder, REMOVE_ORDER_DETAILS, RESET_CONSTRUCTOR, addItem } from '../../services/actions/index';
import { useDrop } from 'react-dnd';





const BurgerConstructor =()=> {     
    
    const [isShowModal, setIsShowModal] = useState(false);
    const dispatch = useDispatch();
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    const bun = useSelector(state=> state.constructorReducer.bun);
    const hasBun = useSelector(state=> state.constructorReducer.hasBun);
    const orderRequest = useSelector(state=> state.orderReducer.orderRequest);
    const orderFailed = useSelector(state=> state.orderReducer.orderFailed);

      

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({            
            isHover: monitor.getItemType() !==bun ? monitor.isOver() : null,
        }),
        drop(item) {
            dispatch(addItem(item, item.ingredient._id))                        
        }                             
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
        const orderList = [bun._id, ...constructorIngredients.map(ingredient => ingredient._id), bun._id] 
        dispatch(sendOrder(orderList));
        if(!orderRequest || !orderFailed) {
            handleOpenModal();
            dispatch({type: RESET_CONSTRUCTOR});                        
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
                    {hasBun && bun.length !== 0 ? 
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
                    {hasBun && constructorIngredients.length === 0 && !isHover ? <p className="text text_type_main-medium pl-8 pt-30">Перенесите желаемые ингредиенты сюда</p>  : constructorIngredients.map((item, index)=> 
                    item.type !== 'bun' &&
                    (
                    <ConstructorCard item={item} index={index} key={index}/>                
                    ))}
                </ul>                
                <div className="pt-4 pl-8">
                        {hasBun && bun.length !== 0 && 
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
                <Button htmlType="button" type="primary" size="large" onClick={confirmOrder} disabled = {!hasBun || constructorIngredients.length === 0} >
                    Оформить заказ
                </Button>
            </div>            
            {isShowModal.visible && modal}        
        </section>
    )
}



export default BurgerConstructor;