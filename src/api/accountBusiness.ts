
//import { Account, AccountCreate, AccountUpdate, AccountPartial, AccountView } from "./accountClasses"
import { IAccountCreate, IAccountUpdate, IAccountPartial, IAccountView } from "./accountInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomUUID } from "crypto";



export class AccountBusiness extends Business<IAccountView> {

    constructor(context:Context) {
        super(context, "account");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "label": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_address": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_swift": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_iban": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_address": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override updateProperties: any = {
  "label": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_address": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "bank_swift": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_iban": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "account_address": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override partialProperties: any = {
  "label": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_address": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_swift": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_iban": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_address": {
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
  "label": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_address": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "bank_swift": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_iban": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "account_address": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    override sortableProperties: any = ["label"];
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IAccountView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IAccountView>>;
    }

    override async create(account:IAccountCreate):Promise<IAccountView> {        
        
        account.id = randomUUID();

        return super.create(account) as Promise<IAccountView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<IAccountView> {
        const account = await super.getById(id);

        maxDepth--;

        
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

        return account;    
    }

    override async update(id:string, account:IAccountUpdate):Promise<IAccountView> {
        return super.update(id, account) as Promise<IAccountView>;
    }

    override async modify(id:string, account:IAccountPartial):Promise<IAccountView> {
        return super.modify(id, account) as Promise<IAccountView>;    
    }

    override async delete(id:string):Promise<IAccountView> {
        return super.delete(id) as Promise<IAccountView>;
    }
}