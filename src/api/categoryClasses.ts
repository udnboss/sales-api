// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { ItemView } from "./itemClasses";

export class Category extends Entity {
    name:string;
    category_id?:string;
}

export class CategoryCreate extends Entity {
    name:string;
    category_id?:string;
}

export class CategoryUpdate extends Entity {
    name:string;
    category_id?:string;
}

export class CategoryPartial extends Entity {
    name?:string;
    category_id?:string;
}

export class CategoryView extends Entity {
    name?:string;
    category_id?:string;
    category?:CategoryView;
    items?:IQueryResult<IQuery, ItemView>;
}