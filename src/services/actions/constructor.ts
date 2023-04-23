import { TIngredientDetails } from "../types/data";

export const ADD_CONSTRUCTOR_ITEM: 'ADD_CONSTRUCTOR_ITEM' = 'ADD_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_BUN: 'ADD_CONSTRUCTOR_BUN' = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_ITEM: 'DELETE_CONSTRUCTOR_ITEM' = 'DELETE_CONSTRUCTOR_ITEM';
export const SORT_CONSTRUCTOR: 'SORT_CONSTRUCTOR' = 'SORT_CONSTRUCTOR';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';


export interface IAddConstructorItemAction {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly constructorItems: TIngredientDetails
}

export interface IAddConstructorBunAction {
    readonly type: typeof ADD_CONSTRUCTOR_BUN;
    readonly bun: TIngredientDetails
}

export interface IDeleteConstructorItemAction {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
    readonly constructorItems: TIngredientDetails;
    readonly index: number
}

export interface ISortConstructorAction {
    readonly type: typeof SORT_CONSTRUCTOR;
    readonly constructorItems: ReadonlyArray<TIngredientDetails>
}

export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions =
|IAddConstructorItemAction
|IAddConstructorBunAction
|IDeleteConstructorItemAction
|IResetConstructorAction
|ISortConstructorAction;

const addConstructorItemAction =(constructorItems: TIngredientDetails): IAddConstructorItemAction => ({
    type: ADD_CONSTRUCTOR_ITEM,
    constructorItems 
})

const addConstructorBunAction =(bun: TIngredientDetails): IAddConstructorBunAction => ({
    type: ADD_CONSTRUCTOR_BUN,
    bun 
})

const sortConstructorAction =(constructorItems: ReadonlyArray<TIngredientDetails>): ISortConstructorAction => ({
    type: SORT_CONSTRUCTOR,
    constructorItems
})

export const resetConstructorAction =(): IResetConstructorAction => ({
    type: RESET_CONSTRUCTOR
})

export const addItem =(item: TIngredientDetails)=> (    
    item.type === 'bun' ? addConstructorBunAction({...item}) : 
    addConstructorItemAction({...item})
)

export const deleteItem=(item: TIngredientDetails, index: number): IDeleteConstructorItemAction => ({
    type: DELETE_CONSTRUCTOR_ITEM,
    constructorItems: item,
    index: index
})


export const sortConstructor =(items: Array<TIngredientDetails>, dragIndex: number, hoverIndex: number)=> {
    const dragItem = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);
    return sortConstructorAction([...items])
}   
