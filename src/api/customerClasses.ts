import { Entity } from "./base";

import { Currency } from "./currencyClasses";
import { Sale } from "./saleClasses";

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
    sales?:SaleView[];
}