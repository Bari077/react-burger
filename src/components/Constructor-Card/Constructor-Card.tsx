import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorCardStyle from './Constructor-Card.module.css';
import { deleteItem, sortConstructor } from '../../services/actions/constructor';
import { useRef, FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import { TIngredientDetails } from '../../services/types/data';

interface IConstructorCardProps {
    item: TIngredientDetails;
    index: number
}

export const ConstructorCard: FC<IConstructorCardProps> =({item, index})=> {
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    
    const dispatch = useDispatch();
    const handleDeleteIngredient =(item: TIngredientDetails, index: number)=> {
        dispatch(deleteItem(item, index))
    }
    
    const ref = useRef<HTMLLIElement>(null);

    const[{isDrag},dragRef] = useDrag({
        type: 'topping',
        item: ()=> {
            return {index}
        },
        collect: monitor=> ({
            isDrag: monitor.isDragging()
        })
    })

    const[,dropRef] = useDrop({
        accept: 'topping',
        hover: (item: {index: number}, monitor)=> {
            if(!ref.current) {
                return
            };
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) {
                return
            };
            const clientOffset = monitor.getClientOffset();
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            
            dispatch(sortConstructor(constructorIngredients, dragIndex, hoverIndex));
            item.index = hoverIndex
        },
    })
    const opacity = isDrag ? 0.3 : 1;    
    dragRef(dropRef(ref));

    return (        
        <li className={constructorCardStyle.item} ref={ref} style = {{opacity}}>
                        <DragIcon type="primary" />                    
                        <ConstructorElement                                                                                     
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={()=> handleDeleteIngredient(item, index)}                                                     
                        />
                    </li>                
    )
}

