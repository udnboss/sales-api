// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, IQueryResult, IQuery } from "./base";



export class Login extends Entity {
    email:string;
    password:string;
}

export class LoginCreate extends Entity {
    email:string;
    password:string;
}

export class LoginUpdate extends Entity {
    email:string;
    password:string;
}

export class LoginPartial extends Entity {
    email?:string;
    password?:string;
}

export class LoginView extends Entity {
    email?:string;
    password?:string;
}