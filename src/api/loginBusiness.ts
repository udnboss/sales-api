
//import { Login, LoginCreate, LoginUpdate, LoginPartial, LoginView } from "./loginClasses"
import { ILoginCreate, ILoginUpdate, ILoginPartial, ILoginView } from "./loginInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

export class LoginBusiness extends Business<ILoginView> {

    constructor(context:Context) {
        super(context, "login");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "email": {
    "required": true,
    "type": "string"
  },
  "password": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "email": {
    "required": true,
    "type": "string"
  },
  "password": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "email": {
    "required": false,
    "type": "string"
  },
  "password": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll():Promise<IQueryResult<IQuery, ILoginView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, ILoginView>>;
    }

    override async create(login:ILoginCreate):Promise<ILoginView> {        
        if (!login.id) {
            login.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(login) as Promise<ILoginView>;
    }

    override async getById(id:string):Promise<ILoginView> {
        return super.getById(id) as any;    
    }

    override async update(id:string, login:ILoginUpdate):Promise<ILoginView> {
        return super.update(id, login) as Promise<ILoginView>;
    }

    override async modify(id:string, login:ILoginPartial):Promise<ILoginView> {
        return super.modify(id, login) as Promise<ILoginView>;    
    }

    override async delete(id:string):Promise<ILoginView> {
        return super.delete(id) as Promise<ILoginView>;
    }
}