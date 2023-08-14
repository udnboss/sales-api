
//import { Currency, CurrencyCreate, CurrencyUpdate, CurrencyPartial, CurrencyView } from "./currencyClasses"
import { ICurrencyCreate, ICurrencyUpdate, ICurrencyPartial, ICurrencyView } from "./currencyInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";



export class CurrencyBusiness extends Business<ICurrencyView> {

    constructor(context:Context) {
        super(context, "currency");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "id": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "symbol": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override updateProperties: any = {
  "id": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "symbol": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override partialProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "symbol": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    override queryProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "symbol": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, ICurrencyView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, ICurrencyView>>;
    }

    override async create(currency:ICurrencyCreate):Promise<ICurrencyView> {        
        if (!currency.id) {
            currency.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(currency) as Promise<ICurrencyView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<ICurrencyView> {
        const currency = await super.getById(id);

        maxDepth--;

        
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

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