// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IClientQuery, IEntity, IQuery, IQueryResult } from "./base";



export interface ICompanyClientQuery extends IClientQuery {
    name?:string;
    address?:string;
    crn?:string;
    trn?:string;
    contact?:string;
    mobile?:string;
    email?:string;
}

export interface ICompany extends IEntity {
    name:string;
    address:string;
    crn:string;
    trn:string;
    contact:string;
    mobile:string;
    email:string;
}

export interface ICompanyCreate extends IEntity {
    name:string;
    address:string;
    crn:string;
    trn:string;
    contact:string;
    mobile:string;
    email:string;
}

export interface ICompanyUpdate extends IEntity {
    name:string;
    address:string;
    crn:string;
    trn:string;
    contact:string;
    mobile:string;
    email:string;
}

export interface ICompanyPartial extends IEntity {
    name?:string;
    address?:string;
    crn?:string;
    trn?:string;
    contact?:string;
    mobile?:string;
    email?:string;
}

export interface ICompanyView extends IEntity {
    name?:string;
    address?:string;
    crn?:string;
    trn?:string;
    contact?:string;
    mobile?:string;
    email?:string;
}
