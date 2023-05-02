import { TUser, TIngredientDetails } from "./data";

export type TAuthResponse = {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly success: boolean;
    readonly user: TUser 
}

export type TMessageResponse = {
    readonly message: string;
    readonly success: boolean
}

export type TIngredientsResponse = {
    readonly data: ReadonlyArray<TIngredientDetails>;
    readonly success: boolean
}

export type TUserResponse = {
    readonly user: TUser;
    readonly success: boolean
}

export type TRefreshTokenResponse = {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly success: boolean
}