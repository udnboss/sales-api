// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { ISaleView } from "./saleInterfaces";
import { ICurrencyView } from "./currencyInterfaces";

export interface ICustomerClientQuery extends IClientQuery {
    name?:string;
}

export interface ICustomer extends IEntity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export interface ICustomerCreate extends IEntity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export interface ICustomerUpdate extends IEntity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export interface ICustomerPartial extends IEntity {
    name?:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export interface ICustomerView extends IEntity {
    name?:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    currency?:ICurrencyView;
    payment_term?:number;
    sales?:IQueryResult<IQuery, ISaleView>;
}
