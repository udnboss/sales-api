
//import { Saleitem, SaleitemCreate, SaleitemUpdate, SaleitemPartial, SaleitemView } from "./saleItemClasses"
import { ISaleitemCreate, ISaleitemUpdate, ISaleitemPartial, ISaleitemView } from "./saleItemInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

export class SaleitemBusiness extends Business<ISaleitemView> {

    constructor(context:Context) {
        super(context, "saleItem");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "sale_id": {
    "required": true,
    "type": "string"
  },
  "item_id": {
    "required": true,
    "type": "string"
  },
  "description": {
    "required": false,
    "type": "string"
  },
  "quantity": {
    "required": true,
    "type": "integer"
  },
  "price": {
    "required": true,
    "type": "number"
  }
};
    override updateProperties: any = {
  "sale_id": {
    "required": true,
    "type": "string"
  },
  "item_id": {
    "required": true,
    "type": "string"
  },
  "description": {
    "required": false,
    "type": "string"
  },
  "quantity": {
    "required": true,
    "type": "integer"
  },
  "price": {
    "required": true,
    "type": "number"
  }
};
    override partialProperties: any = {
  "sale_id": {
    "required": false,
    "type": "string"
  },
  "item_id": {
    "required": false,
    "type": "string"
  },
  "description": {
    "required": false,
    "type": "string"
  },
  "quantity": {
    "required": false,
    "type": "integer"
  },
  "price": {
    "required": false,
    "type": "number"
  }
};
    
    override async getAll():Promise<IQueryResult<IQuery, ISaleitemView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, ISaleitemView>>;
    }

    override async create(saleItem:ISaleitemCreate):Promise<ISaleitemView> {        
        if (!saleItem.id) {
            saleItem.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(saleItem) as Promise<ISaleitemView>;
    }

    override async getById(id:string):Promise<ISaleitemView> {
        return super.getById(id) as any;    
    }

    override async update(id:string, saleItem:ISaleitemUpdate):Promise<ISaleitemView> {
        return super.update(id, saleItem) as Promise<ISaleitemView>;
    }

    override async modify(id:string, saleItem:ISaleitemPartial):Promise<ISaleitemView> {
        return super.modify(id, saleItem) as Promise<ISaleitemView>;    
    }

    override async delete(id:string):Promise<ISaleitemView> {
        return super.delete(id) as Promise<ISaleitemView>;
    }
}