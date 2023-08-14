// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { ICategoryView } from "./categoryInterfaces";

export interface IItemClientQuery extends IClientQuery {
    name?:string;
}

export interface IItem extends IEntity {
    name:string;
    category_id?:string;
}

export interface IItemCreate extends IEntity {
    name:string;
    category_id?:string;
}

export interface IItemUpdate extends IEntity {
    name:string;
    category_id?:string;
}

export interface IItemPartial extends IEntity {
    name?:string;
    category_id?:string;
}

export interface IItemView extends IEntity {
    name?:string;
    category_id?:string;
    category?:ICategoryView;
}
