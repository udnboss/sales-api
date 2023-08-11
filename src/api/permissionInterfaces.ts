import { IEntity } from "./base";



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
}
