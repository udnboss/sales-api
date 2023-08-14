// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { ISaleView } from "./saleInterfaces";
import { IItemView } from "./itemInterfaces";

export interface ISaleitemClientQuery extends IClientQuery {
    
}

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
