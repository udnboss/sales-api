import { Entity } from "./base";

import { CurrencyView } from "./currencyClasses";
import { CustomerView } from "./customerClasses";
import { AccountView } from "./accountClasses";
import { CompanyView } from "./companyClasses";
import { SaleitemView } from "./saleItemClasses";

export class Sale extends Entity {
    company_id:string;
    account_id:string;
    customer_id:string;
    place?:string;
    number?:number;
    date:string;
    currency_id:string;
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
    place?:string;
    date:string;
    currency_id:string;
    reference?:string;
    confirmed:boolean;
    reference_date?:string;
    due_date?:string;
}

export class SaleUpdate extends Entity {
    company_id:string;
    account_id:string;
    customer_id:string;
    place?:string;
    currency_id:string;
    reference?:string;
    confirmed:boolean;
    reference_date?:string;
    due_date?:string;
}

export class SalePartial extends Entity {
    company_id?:string;
    account_id?:string;
    customer_id?:string;
    place?:string;
    currency_id?:string;
    reference?:string;
    confirmed?:boolean;
    reference_date?:string;
    due_date?:string;
}

export class SaleView extends Entity {
    company_id?:string;
    account_id?:string;
    customer_id?:string;
    place?:string;
    number?:number;
    date?:string;
    currency_id?:string;
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