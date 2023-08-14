// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { CategoryView } from "./categoryClasses";

export class Item extends Entity {
    name:string;
    category_id?:string;
}

export class ItemCreate extends Entity {
    name:string;
    category_id?:string;
}

export class ItemUpdate extends Entity {
    name:string;
    category_id?:string;
}

export class ItemPartial extends Entity {
    name?:string;
    category_id?:string;
}

export class ItemView extends Entity {
    name?:string;
    category_id?:string;
    category?:CategoryView;
}