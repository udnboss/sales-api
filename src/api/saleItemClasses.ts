// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { SaleView } from "./saleClasses";
import { ItemView } from "./itemClasses";

export class Saleitem extends Entity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export class SaleitemCreate extends Entity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export class SaleitemUpdate extends Entity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export class SaleitemPartial extends Entity {
    sale_id?:string;
    item_id?:string;
    description?:string;
    quantity?:number;
    price?:number;
}

export class SaleitemView extends Entity {
    sale_id?:string;
    item_id?:string;
    description?:string;
    quantity?:number;
    price?:number;
    sale?:SaleView;
    item?:ItemView;
}