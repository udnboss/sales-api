// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";

import { ILoginView } from "./loginInterfaces";

export interface IUserClientQuery extends IClientQuery {
    name?:string;
    email?:string;
    login_id?:string;
}

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
