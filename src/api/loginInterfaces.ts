// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";



export interface ILoginClientQuery extends IClientQuery {
    email?:string;
}

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
