import { IEntity } from "./base";



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
}
