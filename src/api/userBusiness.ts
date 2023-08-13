
//import { User, UserCreate, UserUpdate, UserPartial, UserView } from "./userClasses"
import { IUserCreate, IUserUpdate, IUserPartial, IUserView } from "./userInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";

import { LoginBusiness } from "./loginBusiness";

export class UserBusiness extends Business<IUserView> {

    constructor(context:Context) {
        super(context, "user");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "email": {
    "required": true,
    "type": "string"
  },
  "login_id": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "email": {
    "required": true,
    "type": "string"
  },
  "login_id": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string"
  },
  "email": {
    "required": false,
    "type": "string"
  },
  "login_id": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, IUserView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, IUserView>>;
    }

    override async create(user:IUserCreate):Promise<IUserView> {        
        if (!user.id) {
            user.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(user) as Promise<IUserView>;
    }

    override async getById(id:string):Promise<IUserView> {
        const user = await super.getById(id);

        if (user.login) { user.login = await new LoginBusiness(this.context).getById(user.login_id); }

        

        return user;    
    }

    override async update(id:string, user:IUserUpdate):Promise<IUserView> {
        return super.update(id, user) as Promise<IUserView>;
    }

    override async modify(id:string, user:IUserPartial):Promise<IUserView> {
        return super.modify(id, user) as Promise<IUserView>;    
    }

    override async delete(id:string):Promise<IUserView> {
        return super.delete(id) as Promise<IUserView>;
    }
}