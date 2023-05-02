import { useMemo, FC } from "react";
import { useSelector } from "../../services/hooks";
import { useDrag } from "react-dnd";
import ingredientStyle from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientDetails } from "../../services/types/data";


interface IIngredientProps {
    ingredient: TIngredientDetails;
    handleOpenModal: (item: TIngredientDetails) => void
}

export const Ingredient: FC<IIngredientProps> =({ingredient, handleOpenModal})=> {
        
    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor=> ({
            opacity: monitor.isDragging() ? 0.3 : 1
          })
    })
    
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    const bun = useSelector(state=> state.constructorReducer.bun);
    
    const count = useMemo(() => {
        return ingredient.type === 'bun'? bun && bun._id === ingredient._id ?  2 : 0 :
        
        constructorIngredients.filter(item => item._id === ingredient._id).length;
      }, [ingredient, bun, constructorIngredients])

    

    return (
        <li className={ingredientStyle.item} onClick={()=> handleOpenModal(ingredient)} style={{opacity}}>           
            <Counter count={count} size="default" extraClass="m-1" />
            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} ref={dragRef}></img>
            <div className={ingredientStyle.price}>
                <span className="text text_type_digits-default pr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>                        
            <p className="text text_type_main-default pt-2 mb-6">{ingredient.name}</p>
        </li>       
    )
}

