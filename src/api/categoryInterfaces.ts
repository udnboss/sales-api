// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { IItemView } from "./itemInterfaces";

export interface ICategoryClientQuery extends IClientQuery {
    name?:string;
}

export interface ICategory extends IEntity {
    name:string;
    category_id?:string;
}

export interface ICategoryCreate extends IEntity {
    name:string;
    category_id?:string;
}

export interface ICategoryUpdate extends IEntity {
    name:string;
    category_id?:string;
}

export interface ICategoryPartial extends IEntity {
    name?:string;
    category_id?:string;
}

export interface ICategoryView extends IEntity {
    name?:string;
    category_id?:string;
    category?:ICategoryView;
    items?:IQueryResult<IQuery, IItemView>;
}
