// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";



export interface ICurrencyClientQuery extends IClientQuery {
    name?:string;
}

export interface ICurrency extends IEntity {
    name:string;
    symbol:string;
}

export interface ICurrencyCreate extends IEntity {
    name:string;
    symbol:string;
}

export interface ICurrencyUpdate extends IEntity {
    name:string;
    symbol:string;
}

export interface ICurrencyPartial extends IEntity {
    name?:string;
    symbol?:string;
}

export interface ICurrencyView extends IEntity {
    name?:string;
    symbol?:string;
}
