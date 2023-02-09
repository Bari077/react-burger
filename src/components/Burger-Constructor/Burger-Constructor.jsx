import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyle from './Burger-Constructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../Order-Details/Order-Details';
import { useSelector, useDispatch } from 'react-redux';
import { getConstructorItems, sendOrder, REMOVE_ORDER_DETAILS } from '../../services/actions/index';




const BurgerConstructor =()=> { 
    const ingredients = useSelector(store => store.ingredientsReducer.items);
    
    const [modalState, setModal] = React.useState({visible : false});
    const [total, setTotal] = React.useState(0);   

    const dispatch = useDispatch();
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    const hasBun = useSelector(state=> state.constructorReducer.hasBun);
    const orderRequest = useSelector(state=> state.orderReducer.orderRequest);
    const orderFailed = useSelector(state=> state.orderReducer.orderFailed);


    
    React.useEffect(() => {
        dispatch(getConstructorItems(ingredients));             
    }, []);

   
    const calcSum =()=> {
        const summary = constructorIngredients.reduce((sum, item) => sum + item.price, constructorIngredients[0].price);
        setTotal(summary)
    }

    React.useEffect(()=> {        
        if(constructorIngredients.length !== 0) {
            calcSum();
        }        
    }, [constructorIngredients]);

    const handleOpenModal =()=> {       
        setModal({ visible: true });
    }
 
    const handleCloseModal =()=> {
        setModal({ visible: false });
        dispatch({ type: REMOVE_ORDER_DETAILS });
    }

    const confirmOrder =()=> {
        dispatch(sendOrder(constructorIngredients));
        if(!orderRequest && !orderFailed) {
            handleOpenModal()
        }
    }
   
    const modal = (
        <Modal onClose={handleCloseModal} >            
            <OrderDetails />           
        </Modal>
    );    

    return(

        <section className={burgerStyle.section}>
            <div className={burgerStyle.container}>
                <div className="pl-8 pb-4">
                    {hasBun &&                    
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={constructorIngredients[0].name + ' (верх)'}
                    price={constructorIngredients[0].price}
                    thumbnail={constructorIngredients[0].image}
                    key={constructorIngredients[0]._id}
                    />}                                        
                </div>
                <ul className={burgerStyle.list}>
                    {constructorIngredients.length && constructorIngredients.map((item, index)=> 
                    item.type !== 'bun' &&
                    (
                    <li className={burgerStyle.item} key={index}>
                        <DragIcon type="primary" />                    
                        <ConstructorElement 
                            type= "default"
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}                            
                        />
                    </li>                
                    ))}
                </ul>                
                <div className="pt-4 pl-8">
                        {hasBun && 
                        <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={constructorIngredients[0].name + ' (низ)'}
                        price={constructorIngredients[0].price}
                        thumbnail={constructorIngredients[0].image}
                        key={constructorIngredients._id}
                        />}                 
                </div>
            </div>
            <div className={burgerStyle.total}>
                <p className="text text_type_digits-medium pr-3">{total}</p>
                <div className={burgerStyle.order} > <CurrencyIcon type="primary" /></div>                
                <Button htmlType="button" type="primary" size="large" onClick={confirmOrder}>
                    Оформить заказ
                </Button>
            </div>            
            {modalState.visible && modal}        
        </section>
    )
}



export default BurgerConstructor;