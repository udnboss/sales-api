
//import { Item, ItemCreate, ItemUpdate, ItemPartial, ItemView } from "./itemClasses"
import { IItemCreate, IItemUpdate, IItemPartial, IItemView } from "./itemInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

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
    
    override async getAll():Promise<IQueryResult<IQuery, IItemView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, IItemView>>;
    }

    override async create(item:IItemCreate):Promise<IItemView> {        
        if (!item.id) {
            item.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(item) as Promise<IItemView>;
    }

    override async getById(id:string):Promise<IItemView> {
        return super.getById(id) as any;    
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