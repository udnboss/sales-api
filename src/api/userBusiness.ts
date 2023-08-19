
//import { User, UserCreate, UserUpdate, UserPartial, UserView } from "./userClasses"
import { IUserCreate, IUserUpdate, IUserPartial, IUserView } from "./userInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "login_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "login_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "login_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    override queryProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "login_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  }
};
    override sortableProperties: any = ["name", "email"];
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IUserView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IUserView>>;
    }

    override async create(user:IUserCreate):Promise<IUserView> {        
        
        user.id = randomUUID();

        return super.create(user) as Promise<IUserView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<IUserView> {
        const user = await super.getById(id);

        maxDepth--;

        if (user.login_id) { user.login = await new LoginBusiness(this.context).getById(user.login_id); }
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

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