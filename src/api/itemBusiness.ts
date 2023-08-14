
//import { Item, ItemCreate, ItemUpdate, ItemPartial, ItemView } from "./itemClasses"
import { IItemCreate, IItemUpdate, IItemPartial, IItemView } from "./itemInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
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
    "type": "string",
    "operator": "like"
  },
  "category_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "category_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "category_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    override queryProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "category_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IItemView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IItemView>>;
    }

    override async create(item:IItemCreate):Promise<IItemView> {        
        if (!item.id) {
            item.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(item) as Promise<IItemView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<IItemView> {
        const item = await super.getById(id);

        maxDepth--;

        if (item.category_id) { item.category = await new CategoryBusiness(this.context).getById(item.category_id); }
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

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