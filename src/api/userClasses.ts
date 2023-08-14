// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";

import { LoginView } from "./loginClasses";

export class User extends Entity {
    name:string;
    email:string;
    login_id:string;
}

export class UserCreate extends Entity {
    name:string;
    email:string;
    login_id:string;
}

export class UserUpdate extends Entity {
    name:string;
    email:string;
    login_id:string;
}

export class UserPartial extends Entity {
    name?:string;
    email?:string;
    login_id?:string;
}

export class UserView extends Entity {
    name?:string;
    email?:string;
    login_id?:string;
    login?:LoginView;
}