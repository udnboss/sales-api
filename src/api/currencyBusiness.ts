
//import { Currency, CurrencyCreate, CurrencyUpdate, CurrencyPartial, CurrencyView } from "./currencyClasses"
import { ICurrencyCreate, ICurrencyUpdate, ICurrencyPartial, ICurrencyView } from "./currencyInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";



export class CurrencyBusiness extends Business<ICurrencyView> {

    constructor(context:Context) {
        super(context, "currency");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "name": {
    "required": true,
    "type": "string"
  },
  "symbol": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "name": {
    "required": true,
    "type": "string"
  },
  "symbol": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "id": {
    "required": false,
    "type": "string"
  },
  "name": {
    "required": false,
    "type": "string"
  },
  "symbol": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, ICurrencyView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, ICurrencyView>>;
    }

    override async create(currency:ICurrencyCreate):Promise<ICurrencyView> {        
        if (!currency.id) {
            currency.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(currency) as Promise<ICurrencyView>;
    }

    override async getById(id:string):Promise<ICurrencyView> {
        const currency = await super.getById(id);

        

        

        return currency;    
    }

    override async update(id:string, currency:ICurrencyUpdate):Promise<ICurrencyView> {
        return super.update(id, currency) as Promise<ICurrencyView>;
    }

    override async modify(id:string, currency:ICurrencyPartial):Promise<ICurrencyView> {
        return super.modify(id, currency) as Promise<ICurrencyView>;    
    }

    override async delete(id:string):Promise<ICurrencyView> {
        return super.delete(id) as Promise<ICurrencyView>;
    }
}