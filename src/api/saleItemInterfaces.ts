import { IEntity } from "./base";

import { IItem } from "./itemInterfaces";
import { ISale } from "./saleInterfaces";

export interface ISaleitem extends IEntity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export interface ISaleitemCreate extends IEntity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export interface ISaleitemUpdate extends IEntity {
    sale_id:string;
    item_id:string;
    description?:string;
    quantity:number;
    price:number;
}

export interface ISaleitemPartial extends IEntity {
    sale_id?:string;
    item_id?:string;
    description?:string;
    quantity?:number;
    price?:number;
}

export interface ISaleitemView extends IEntity {
    sale_id?:string;
    item_id?:string;
    description?:string;
    quantity?:number;
    price?:number;
    sale?:ISaleView;
    item?:IItemView;
}
