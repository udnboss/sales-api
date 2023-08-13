import { IEntity } from "./base";

import { ILogin } from "./loginInterfaces";

export interface IUser extends IEntity {
    name:string;
    email:string;
    login_id:string;
}

export interface IUserCreate extends IEntity {
    name:string;
    email:string;
    login_id:string;
}

export interface IUserUpdate extends IEntity {
    name:string;
    email:string;
    login_id:string;
}

export interface IUserPartial extends IEntity {
    name?:string;
    email?:string;
    login_id?:string;
}

export interface IUserView extends IEntity {
    name?:string;
    email?:string;
    login_id?:string;
    login?:ILoginView;
}
