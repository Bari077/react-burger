import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyle from './Burger-Constructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../Order-Details/Order-Details';
import { postOrder } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/ingredientsContext';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';




const BurgerConstructor =()=> { 
    const [modalState, setModal] = React.useState({visible : false});
    const [total, setTotal] = React.useState(0);
    const [ingredients] = React.useContext(IngredientsContext);

    //функция создания массива с случайными ингредиентами
    const createRandomIngredients =(arr, n)=> {
        const arrNoBun = arr.filter(i => i.type !== 'bun');
        const arrBun = arr.filter(i => i.type === 'bun');
        const randomArr = [];
        for(let i=0; i <=n; i++ ) {            
            const rand = Math.floor(Math.random() * arrNoBun.length);
            randomArr.push(arrNoBun[rand])
        }
        const randBun = Math.floor(Math.random() * arrBun.length)
        randomArr.unshift(arrBun[randBun]);
        return randomArr        
    }     

    const {constructorState, setConstructorState} = React.useContext(BurgerConstructorContext);
    const [orderDetails, setOrderDetails] = React.useState(
        {
            name: '',
            order: {number: 0}
        }
    );
    
    React.useEffect(() => {
        const constructorIngredients = createRandomIngredients(ingredients, 5);
        setConstructorState(
            {
            ...constructorState,
            hasIngredients : true,
            hasBun : true,
            data : constructorIngredients
        })
    }, [])

   //здесь начальной ставлю стоимость одной булки, т.к. при сведении сумма второй булки сидит в самом массиве
    const calcSum =()=> {
        const summary = constructorState.data.reduce((sum, item) => sum + item.price, constructorState.data[0].price);
        setTotal(summary)
    }

    React.useEffect(()=> {        
        if(constructorState.data.length !== 0) {
            calcSum();
        }        
    }, [constructorState.data]);

    const handleOpenModal =()=> {       
        setModal({ visible: true });
    }
 
    const handleCloseModal =()=> {
        setModal({ visible: false });
    }

    

    const sendOrder =()=> {
        const idList = constructorState.data.map((i) => i._id)
        const order = {
            "ingredients" : idList    
        }
        postOrder(order)
        .then(data => {
            if(data.success) {
                setOrderDetails({ name: data.name, order: {number: data.order.number}});
                handleOpenModal()
            };                                 
        })
        .catch((err) => {
            alert(err)
        })        
    }
    
    const modal = (
        <Modal onClose={handleCloseModal} >            
            <OrderDetails orderNumber ={orderDetails.order.number} />           
        </Modal>
    );    

    return(

        <section className={burgerStyle.section}>
            <div className={burgerStyle.container}>
                <div className="pl-8 pb-4">
                    {constructorState.hasBun &&                    
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={constructorState.data[0].name + ' (верх)'}
                    price={constructorState.data[0].price}
                    thumbnail={constructorState.data[0].image}
                    key={constructorState.data[0]._id}
                    />}                                        
                </div>
                <ul className={burgerStyle.list}>
                    {constructorState.hasIngredients && constructorState.data.map((item, index)=> 
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
                        {constructorState.hasBun && 
                        <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={constructorState.data[0].name + ' (низ)'}
                        price={constructorState.data[0].price}
                        thumbnail={constructorState.data[0].image}
                        key={constructorState.data[0]._id}
                        />}                 
                </div>
            </div>
            <div className={burgerStyle.total}>
                <p className="text text_type_digits-medium pr-3">{total}</p>
                <div className={burgerStyle.order} > <CurrencyIcon type="primary" /></div>                
                <Button htmlType="button" type="primary" size="large" onClick={sendOrder}>
                    Оформить заказ
                </Button>
            </div>            
            {modalState.visible && modal}        
        </section>
    )
}



export default BurgerConstructor;