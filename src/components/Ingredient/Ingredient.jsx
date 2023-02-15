import { useDrag } from "react-dnd";
import { useSelector} from 'react-redux';
import ingredientStyle from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';


export const Ingredient =({ingredient, handleOpenModal})=> {    
    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
        collect: monitor=> ({
            opacity: monitor.isDragging() ? 0.3 : 1
          })
    })
    
    const idList = useSelector(state=> state.constructorReducer.idList);
    const bun = useSelector(state=> state.constructorReducer.bun);
    
    
    const countIngredients = () => {
        if(ingredient.type !== 'bun') {
            const mapId = idList.reduce((id, qty) =>{
                id[qty.id] = qty
                return id
            }, {});
            const idCount = mapId[ingredient._id]       
            return idList.some(item=> item.id === ingredient._id) ? idCount.qty  : 0 
        } else {
            return bun.length !== 0 ? (bun._id === ingredient._id ? 2 : 0) : 0
        }
        
    } 
    

    return (
        <li className={ingredientStyle.item} onClick={()=> handleOpenModal(ingredient)} style={{opacity}}>           
                                <Counter count={countIngredients()} size="default" extraClass="m-1" />
                                <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} ref={dragRef}></img>
                                <div className={ingredientStyle.price}>
                                    <span className="text text_type_digits-default pr-2">{ingredient.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>                        
                                <p className="text text_type_main-default pt-2 mb-6">{ingredient.name}</p>
                            </li>       
    )
}