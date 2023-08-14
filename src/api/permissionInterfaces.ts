// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { IRolepermissionView } from "./rolePermissionInterfaces";

export interface IPermissionClientQuery extends IClientQuery {
    name?:string;
    entity?:string;
    action?:string;
}

export interface IPermission extends IEntity {
    name:string;
    entity:string;
    action:string;
}

export interface IPermissionCreate extends IEntity {
    name:string;
    entity:string;
    action:string;
}

export interface IPermissionUpdate extends IEntity {
    name:string;
    entity:string;
    action:string;
}

export interface IPermissionPartial extends IEntity {
    name?:string;
    entity?:string;
    action?:string;
}

export interface IPermissionView extends IEntity {
    name?:string;
    entity?:string;
    action?:string;
    roles?:IQueryResult<IQuery, IRolepermissionView>;
}
