// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { IRolepermissionView } from "./rolePermissionInterfaces";

export interface IRoleClientQuery extends IClientQuery {
    name?:string;
}

export interface IRole extends IEntity {
    name:string;
}

export interface IRoleCreate extends IEntity {
    name:string;
}

export interface IRoleUpdate extends IEntity {
    name:string;
}

export interface IRolePartial extends IEntity {
    name?:string;
}

export interface IRoleView extends IEntity {
    name?:string;
    rolePermissions?:IQueryResult<IQuery, IRolepermissionView>;
}
