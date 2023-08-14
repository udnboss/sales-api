// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { RolepermissionView } from "./rolePermissionClasses";

export class Permission extends Entity {
    name:string;
    entity:string;
    action:string;
}

export class PermissionCreate extends Entity {
    name:string;
    entity:string;
    action:string;
}

export class PermissionUpdate extends Entity {
    name:string;
    entity:string;
    action:string;
}

export class PermissionPartial extends Entity {
    name?:string;
    entity?:string;
    action?:string;
}

export class PermissionView extends Entity {
    name?:string;
    entity?:string;
    action?:string;
    roles?:IQueryResult<IQuery, RolepermissionView>;
}