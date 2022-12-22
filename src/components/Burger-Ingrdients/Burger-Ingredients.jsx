import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './Burger-Ingredients.module.css';

const SwitchIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
  }

const Bun =({item}) => {
    if(item.type === 'bun') {
    return (
        <li className={burgerIngredientsStyle.item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
            <div className={burgerIngredientsStyle.price}>
                <span className="text text_type_digits-default pr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>                        
            <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
        </li>
    )}
}

const Sauce =({item}) => {
    if(item.type === 'sauce') {
    return (
        <li className={burgerIngredientsStyle.item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
            <div className={burgerIngredientsStyle.price}>
                <span className="text text_type_digits-default pr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>                        
            <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
        </li>
    )}
}

const Filling =({item}) => {
    if(item.type === 'main') {
    return (
        <li className={burgerIngredientsStyle.item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className="pl-4 pr-4" src={item.image} alt={item.name}></img>
            <div className={burgerIngredientsStyle.price}>
                <span className="text text_type_digits-default pr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>                        
            <p className="text text_type_main-default pt-2 mb-6">{item.name}</p>
        </li>
    )}
}


class BurgerIngredients extends React.Component {     
    
      
    render() { 

        return(
            <section className={burgerIngredientsStyle.section}>                
                <SwitchIngredients />
                <article className={burgerIngredientsStyle.container}>
                    <h3 className="text text_type_main-medium pt-10">Булки</h3>
                    <ul className={burgerIngredientsStyle.list}>
                        {this.props.data.map((item, index) => (
                            <Bun item={item} key={index}/>
                        ))}                                   
                    </ul>
                    <h3 className="text text_type_main-medium pt-10">Соусы</h3>
                    <ul className={burgerIngredientsStyle.list}>
                        {this.props.data.map((item, index) => (
                            <Sauce item={item} key={index}/>
                        ))}                                   
                    </ul> 
                    <h3 className="text text_type_main-medium pt-10">Начинки</h3>
                    <ul className={burgerIngredientsStyle.list}>
                        {this.props.data.map((item, index) => (
                            <Filling item={item} key={index}/>
                        ))}                                   
                    </ul>
                </article>                                                                  
            </section>
        )
    }
}

export default BurgerIngredients;