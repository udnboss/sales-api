
//import { Company, CompanyCreate, CompanyUpdate, CompanyPartial, CompanyView } from "./companyClasses"
import { ICompanyCreate, ICompanyUpdate, ICompanyPartial, ICompanyView } from "./companyInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomUUID } from "crypto";



export class CompanyBusiness extends Business<ICompanyView> {

    constructor(context:Context) {
        super(context, "company");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "address": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "crn": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "trn": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "contact": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "mobile": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "address": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "crn": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "trn": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "contact": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "mobile": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": true,
    "type": "string",
    "operator": "like"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "address": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "crn": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "trn": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "contact": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "mobile": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "email": {
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
  "name": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "address": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "crn": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "trn": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "contact": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "mobile": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "email": {
    "required": false,
    "type": "string",
    "operator": "like"
  }
};
    override sortableProperties: any = ["name"];
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, ICompanyView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, ICompanyView>>;
    }

    override async create(company:ICompanyCreate):Promise<ICompanyView> {        
        
        company.id = randomUUID();

        return super.create(company) as Promise<ICompanyView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<ICompanyView> {
        const company = await super.getById(id);

        maxDepth--;

        
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

        return company;    
    }

    override async update(id:string, company:ICompanyUpdate):Promise<ICompanyView> {
        return super.update(id, company) as Promise<ICompanyView>;
    }

    override async modify(id:string, company:ICompanyPartial):Promise<ICompanyView> {
        return super.modify(id, company) as Promise<ICompanyView>;    
    }

    override async delete(id:string):Promise<ICompanyView> {
        return super.delete(id) as Promise<ICompanyView>;
    }
}