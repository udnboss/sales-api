// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { SaleView } from "./saleClasses";
import { CurrencyView } from "./currencyClasses";

export class Customer extends Entity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export class CustomerCreate extends Entity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export class CustomerUpdate extends Entity {
    name:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export class CustomerPartial extends Entity {
    name?:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    payment_term?:number;
}

export class CustomerView extends Entity {
    name?:string;
    address?:string;
    contact?:string;
    currency_id?:string;
    currency?:CurrencyView;
    payment_term?:number;
    sales?:IQueryResult<IQuery, SaleView>;
}