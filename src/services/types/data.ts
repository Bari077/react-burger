export type TUser = {    
    readonly email: string;
    readonly name: string;
}

export type TIngredientDetails = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
}

export type TOrderStatus = 'done'|'pending'|'created'; 

export type TOrder = {
    readonly _id: string;
    readonly createdAt: string;
    readonly ingredients: ReadonlyArray<TIngredientDetails>;
    readonly name: string;
    readonly number: number | '';
    readonly owner: TUser & {
        readonly createdAt: string;
        readonly updatedAt: string;
    }
    readonly price: number;
    readonly status: TOrderStatus;
    readonly updatedAt: string;
}

export type TOrderDetails = {
    readonly name: string;
    readonly order: TOrder;
    readonly success: boolean;
}

export type TWsOrders = {
    readonly orders: Array<TOrder>;
    readonly success: boolean;
    readonly total: number;
    readonly totalToday: number;
}