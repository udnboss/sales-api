import { IEntity } from "./base";

import { ICurrency } from "./currencyInterfaces";
import { ICustomer } from "./customerInterfaces";
import { ISaleitem } from "./saleItemInterfaces";
import { ICompany } from "./companyInterfaces";
import { IAccount } from "./accountInterfaces";

export interface ISale extends IEntity {
    company_id:string;
    account_id:string;
    customer_id:string;
    currency_id:string;
    place?:string;
    number?:number;
    date:string;
    total:number;
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
    reference?:string;
    confirmed?:boolean;
    reference_date?:string;
    due_date?:string;
    currency?:ICurrencyView;
    customer?:ICustomerView;
    account?:IAccountView;
    company?:ICompanyView;
    items?:ISaleitemView[];
}
