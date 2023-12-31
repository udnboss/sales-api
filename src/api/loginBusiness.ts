
//import { Login, LoginCreate, LoginUpdate, LoginPartial, LoginView } from "./loginClasses"
import { ILoginCreate, ILoginUpdate, ILoginPartial, ILoginView } from "./loginInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomUUID } from "crypto";



export class LoginBusiness extends Business<ILoginView> {

    constructor(context:Context) {
        super(context, "login");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "password": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override updateProperties: any = {
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "password": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override partialProperties: any = {
  "email": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "password": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    override queryProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "email": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "password": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    override sortableProperties: any = ["email"];
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, ILoginView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, ILoginView>>;
    }

    override async create(login:ILoginCreate):Promise<ILoginView> {        
        
        login.id = randomUUID();

        return super.create(login) as Promise<ILoginView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<ILoginView> {
        const login = await super.getById(id);

        maxDepth--;

        
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

        return login;    
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