// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { CustomerView } from "./customerClasses";
import { CompanyView } from "./companyClasses";
import { SaleitemView } from "./saleItemClasses";
import { AccountView } from "./accountClasses";
import { CurrencyView } from "./currencyClasses";

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
    items?:IQueryResult<IQuery, SaleitemView>;
}