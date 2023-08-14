
//import { Account, AccountCreate, AccountUpdate, AccountPartial, AccountView } from "./accountClasses"
import { IAccountCreate, IAccountUpdate, IAccountPartial, IAccountView } from "./accountInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";



export class AccountBusiness extends Business<IAccountView> {

    constructor(context:Context) {
        super(context, "account");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "label": {
    "required": true,
    "type": "string"
  },
  "bank_name": {
    "required": true,
    "type": "string"
  },
  "bank_address": {
    "required": true,
    "type": "string"
  },
  "bank_swift": {
    "required": true,
    "type": "string"
  },
  "account_name": {
    "required": true,
    "type": "string"
  },
  "account_iban": {
    "required": true,
    "type": "string"
  },
  "account_address": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "label": {
    "required": true,
    "type": "string"
  },
  "bank_name": {
    "required": true,
    "type": "string"
  },
  "bank_address": {
    "required": true,
    "type": "string"
  },
  "bank_swift": {
    "required": true,
    "type": "string"
  },
  "account_name": {
    "required": true,
    "type": "string"
  },
  "account_iban": {
    "required": true,
    "type": "string"
  },
  "account_address": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "label": {
    "required": false,
    "type": "string"
  },
  "bank_name": {
    "required": false,
    "type": "string"
  },
  "bank_address": {
    "required": false,
    "type": "string"
  },
  "bank_swift": {
    "required": false,
    "type": "string"
  },
  "account_name": {
    "required": false,
    "type": "string"
  },
  "account_iban": {
    "required": false,
    "type": "string"
  },
  "account_address": {
    "required": false,
    "type": "string"
  }
};
    override queryProperties: any = {
  "label": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IAccountView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IAccountView>>;
    }

    override async create(account:IAccountCreate):Promise<IAccountView> {        
        if (!account.id) {
            account.id = randomUUID(); //TODO: autonumber case
        }
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