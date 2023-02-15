import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorCardStyle from './Constructor-Card.module.css';
import { deleteItem, sortConstructor } from '../../services/actions/index';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

export const ConstructorCard =({item, index})=> {
    const constructorIngredients = useSelector(state=> state.constructorReducer.constructorItems);
    
    const dispatch = useDispatch();
    const handleDeleteIngredient =(item, index)=> {
        dispatch(deleteItem(item, index))
    }
    
    const ref = useRef(null);

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
        hover: (item, monitor)=> {
            if(!ref.current) {
                return
            };
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) {
                return
            };
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;
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