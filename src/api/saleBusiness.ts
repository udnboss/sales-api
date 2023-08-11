
//import { Sale, SaleCreate, SaleUpdate, SalePartial, SaleView } from "./saleClasses"
import { ISaleCreate, ISaleUpdate, ISalePartial, ISaleView } from "./saleInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

export class SaleBusiness extends Business<ISaleView> {

    constructor(context:Context) {
        super(context, "sale");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "company_id": {
    "required": true,
    "type": "string"
  },
  "account_id": {
    "required": true,
    "type": "string"
  },
  "customer_id": {
    "required": true,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "date": {
    "required": true,
    "type": "string"
  },
  "currency_id": {
    "required": true,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": true,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    override updateProperties: any = {
  "company_id": {
    "required": true,
    "type": "string"
  },
  "account_id": {
    "required": true,
    "type": "string"
  },
  "customer_id": {
    "required": true,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": true,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": true,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    override partialProperties: any = {
  "company_id": {
    "required": false,
    "type": "string"
  },
  "account_id": {
    "required": false,
    "type": "string"
  },
  "customer_id": {
    "required": false,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": false,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": false,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll():Promise<IQueryResult<IQuery, ISaleView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, ISaleView>>;
    }

    override async create(sale:ISaleCreate):Promise<ISaleView> {        
        if (!sale.id) {
            sale.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(sale) as Promise<ISaleView>;
    }

    override async getById(id:string):Promise<ISaleView> {
        return super.getById(id) as any;    
    }

    override async update(id:string, sale:ISaleUpdate):Promise<ISaleView> {
        return super.update(id, sale) as Promise<ISaleView>;
    }

    override async modify(id:string, sale:ISalePartial):Promise<ISaleView> {
        return super.modify(id, sale) as Promise<ISaleView>;    
    }

    override async delete(id:string):Promise<ISaleView> {
        return super.delete(id) as Promise<ISaleView>;
    }
}