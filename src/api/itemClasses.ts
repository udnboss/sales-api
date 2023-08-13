import { Entity } from "./base";

import { Category } from "./categoryClasses";

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