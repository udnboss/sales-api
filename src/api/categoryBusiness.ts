
//import { Category, CategoryCreate, CategoryUpdate, CategoryPartial, CategoryView } from "./categoryClasses"
import { ICategoryCreate, ICategoryUpdate, ICategoryPartial, ICategoryView } from "./categoryInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";

import { ItemBusiness } from "./itemBusiness";

export class CategoryBusiness extends Business<ICategoryView> {

    constructor(context:Context) {
        super(context, "category");
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
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, ICategoryView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, ICategoryView>>;
    }

    override async create(category:ICategoryCreate):Promise<ICategoryView> {        
        if (!category.id) {
            category.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(category) as Promise<ICategoryView>;
    }

    override async getById(id:string):Promise<ICategoryView> {
        const category = await super.getById(id);

        if (category.category) { category.category = await new CategoryBusiness(this.context).getById(category.category_id); }

        category.items = (await new ItemBusiness(this.context).getAll([ { column: 'category_id', operator: Operator.Equals, value: category.id } as ICondition])).result;

        return category;    
    }

    override async update(id:string, category:ICategoryUpdate):Promise<ICategoryView> {
        return super.update(id, category) as Promise<ICategoryView>;
    }

    override async modify(id:string, category:ICategoryPartial):Promise<ICategoryView> {
        return super.modify(id, category) as Promise<ICategoryView>;    
    }

    override async delete(id:string):Promise<ICategoryView> {
        return super.delete(id) as Promise<ICategoryView>;
    }
}