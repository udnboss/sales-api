// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { IRoleView } from "./roleInterfaces";
import { IPermissionView } from "./permissionInterfaces";

export interface IRolepermissionClientQuery extends IClientQuery {
    role_id?:string;
    permission_id?:string;
}

export interface IRolepermission extends IEntity {
    role_id:string;
    permission_id:string;
}

export interface IRolepermissionCreate extends IEntity {
    role_id:string;
    permission_id:string;
}

export interface IRolepermissionUpdate extends IEntity {
    role_id:string;
    permission_id:string;
}

export interface IRolepermissionPartial extends IEntity {
    role_id?:string;
    permission_id?:string;
}

export interface IRolepermissionView extends IEntity {
    role_id?:string;
    permission_id?:string;
    role?:IRoleView;
    permission?:IPermissionView;
}
