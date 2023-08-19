// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { ICompanyView } from "./companyInterfaces";
import { ICustomerView } from "./customerInterfaces";
import { ISaleitemView } from "./saleItemInterfaces";
import { IAccountView } from "./accountInterfaces";
import { ICurrencyView } from "./currencyInterfaces";

export interface ISaleClientQuery extends IClientQuery {
    company_id?:string;
    account_id?:string;
    customer_id?:string;
    currency_id?:string;
    place?:string;
    number?:number;
    date?:string;
    total?:number;
    totalItems?:number;
    reference?:string;
    confirmed?:boolean;
    reference_date?:string;
    due_date?:string;
}

export interface ISale extends IEntity {
    company_id:string;
    account_id:string;
    customer_id:string;
    currency_id:string;
    place?:string;
    number?:number;
    date:string;
    total?:number;
    totalItems?:number;
    reference?:string;
    confirmed:boolean;
    reference_date?:string;
    due_date?:string;
}

export interface ISaleCreate extends IEntity {
    company_id:string;
    account_id:string;
    customer_id:string;
    currency_id:string;
    place?:string;
    date:string;
    reference?:string;
    confirmed:boolean;
    reference_date?:string;
    due_date?:string;
}

export interface ISaleUpdate extends IEntity {
    company_id:string;
    account_id:string;
    customer_id:string;
    currency_id:string;
    place?:string;
    reference?:string;
    confirmed:boolean;
    reference_date?:string;
    due_date?:string;
}

export interface ISalePartial extends IEntity {
    company_id?:string;
    account_id?:string;
    customer_id?:string;
    currency_id?:string;
    place?:string;
    reference?:string;
    confirmed?:boolean;
    reference_date?:string;
    due_date?:string;
}

export interface ISaleView extends IEntity {
    company_id?:string;
    account_id?:string;
    customer_id?:string;
    currency_id?:string;
    place?:string;
    number?:number;
    date?:string;
    total?:number;
    totalItems?:number;
    reference?:string;
    confirmed?:boolean;
    reference_date?:string;
    due_date?:string;
    currency?:ICurrencyView;
    customer?:ICustomerView;
    account?:IAccountView;
    company?:ICompanyView;
    items?:IQueryResult<IQuery, ISaleitemView>;
}
