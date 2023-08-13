
//import { Item, ItemCreate, ItemUpdate, ItemPartial, ItemView } from "./itemClasses"
import { IItemCreate, IItemUpdate, IItemPartial, IItemView } from "./itemInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";

import { CategoryBusiness } from "./categoryBusiness";

export class ItemBusiness extends Business<IItemView> {

    constructor(context:Context) {
        super(context, "item");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "category_id": {
    "required": false,
    "type": "string"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "category_id": {
    "required": false,
    "type": "string"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string"
  },
  "category_id": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, IItemView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, IItemView>>;
    }

    override async create(item:IItemCreate):Promise<IItemView> {        
        if (!item.id) {
            item.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(item) as Promise<IItemView>;
    }

    override async getById(id:string):Promise<IItemView> {
        const item = await super.getById(id);

        if (item.category) { item.category = await new CategoryBusiness(this.context).getById(item.category_id); }

        

        return item;    
    }

    override async update(id:string, item:IItemUpdate):Promise<IItemView> {
        return super.update(id, item) as Promise<IItemView>;
    }

    override async modify(id:string, item:IItemPartial):Promise<IItemView> {
        return super.modify(id, item) as Promise<IItemView>;    
    }

    override async delete(id:string):Promise<IItemView> {
        return super.delete(id) as Promise<IItemView>;
    }
}