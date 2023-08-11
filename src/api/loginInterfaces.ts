import { IEntity } from "./base";



export interface ILogin extends IEntity {
    email:string;
    password:string;
}

export interface ILoginCreate extends IEntity {
    email:string;
    password:string;
}

export interface ILoginUpdate extends IEntity {
    email:string;
    password:string;
}

export interface ILoginPartial extends IEntity {
    email?:string;
    password?:string;
}

export interface ILoginView extends IEntity {
    email?:string;
    password?:string;
}
