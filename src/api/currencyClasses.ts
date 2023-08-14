// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";



export class Currency extends Entity {
    name:string;
    symbol:string;
}

export class CurrencyCreate extends Entity {
    name:string;
    symbol:string;
}

export class CurrencyUpdate extends Entity {
    name:string;
    symbol:string;
}

export class CurrencyPartial extends Entity {
    name?:string;
    symbol?:string;
}

export class CurrencyView extends Entity {
    name?:string;
    symbol?:string;
}