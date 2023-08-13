import { Entity } from "./base";

import { Saleitem } from "./saleItemClasses";
import { Account } from "./accountClasses";
import { Company } from "./companyClasses";
import { Currency } from "./currencyClasses";
import { Customer } from "./customerClasses";

export class Sale extends Entity {
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

export class SaleCreate extends Entity {
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

export class SaleUpdate extends Entity {
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

export class SalePartial extends Entity {
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

export class SaleView extends Entity {
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
    currency?:CurrencyView;
    customer?:CustomerView;
    account?:AccountView;
    company?:CompanyView;
    items?:SaleitemView[];
}