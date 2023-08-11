import { Entity } from "./base";

import { RoleView } from "./roleClasses";
import { PermissionView } from "./permissionClasses";

export class Rolepermission extends Entity {
    role_id:string;
    permission_id:string;
}

export class RolepermissionCreate extends Entity {
    role_id:string;
    permission_id:string;
}

export class RolepermissionUpdate extends Entity {
    role_id:string;
    permission_id:string;
}

export class RolepermissionPartial extends Entity {
    role_id?:string;
    permission_id?:string;
}

export class RolepermissionView extends Entity {
    role_id?:string;
    permission_id?:string;
    role?:RoleView;
    permission?:PermissionView;
}