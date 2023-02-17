export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const SORT_CONSTRUCTOR = 'SORT_CONSTRUCTOR';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';


export const addItem =(item, itemId)=> (    
    item.ingredient.type === 'bun' ? {
        type: ADD_CONSTRUCTOR_BUN,
        bun: item.ingredient
    } : 
    {
        type: ADD_CONSTRUCTOR_ITEM,
        constructorItems: item.ingredient,
        idList: itemId                
    }
)

export const deleteItem=(item, index)=> ({
    type: DELETE_CONSTRUCTOR_ITEM,
    constructorItems: item,
    index: index
})


 export const sortConstructor =(items, dragIndex, hoverIndex)=> {
    const dragItem = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);
    return ({
        type: SORT_CONSTRUCTOR,
        constructorItems: [...items]
    })
 }   
