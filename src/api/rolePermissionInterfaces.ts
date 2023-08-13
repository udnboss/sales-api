import { IEntity } from "./base";

import { IPermission } from "./permissionInterfaces";
import { IRole } from "./roleInterfaces";

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
