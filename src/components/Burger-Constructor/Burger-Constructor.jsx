import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyle from './Burger-Constructor.module.css';

const BurgerConstructor =(props)=> { 

    return(
        <section>
            <div className="pl-4 pr-4" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="pl-8 pb-4">
                <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
                <ul className={burgerStyle.list}>
                    {props.data.map((item, index)=> (
                    <li style={{ display: 'flex', columnGap: '8px', alignItems: 'center' }} className="pb-4" key={index}>
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
                <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={20}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
            </div>
            <div className={burgerStyle.total}>
                <p className="text text_type_digits-medium pr-3">610</p>
                <div className="mr-10" style={{ transform: 'scale(1.5)'}}> <CurrencyIcon type="primary" /></div>                
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>        
        </section>
    )
}

export default BurgerConstructor;