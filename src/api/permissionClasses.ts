import { Entity } from "./base";



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
}