
//import { Company, CompanyCreate, CompanyUpdate, CompanyPartial, CompanyView } from "./companyClasses"
import { ICompanyCreate, ICompanyUpdate, ICompanyPartial, ICompanyView } from "./companyInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

export class CompanyBusiness extends Business<ICompanyView> {

    constructor(context:Context) {
        super(context, "company");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "address": {
    "required": true,
    "type": "string"
  },
  "crn": {
    "required": true,
    "type": "string"
  },
  "trn": {
    "required": true,
    "type": "string"
  },
  "contact": {
    "required": true,
    "type": "string"
  },
  "mobile": {
    "required": true,
    "type": "string"
  },
  "email": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "address": {
    "required": true,
    "type": "string"
  },
  "crn": {
    "required": true,
    "type": "string"
  },
  "trn": {
    "required": true,
    "type": "string"
  },
  "contact": {
    "required": true,
    "type": "string"
  },
  "mobile": {
    "required": true,
    "type": "string"
  },
  "email": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "name": {
    "required": false,
    "type": "string"
  },
  "address": {
    "required": false,
    "type": "string"
  },
  "crn": {
    "required": false,
    "type": "string"
  },
  "trn": {
    "required": false,
    "type": "string"
  },
  "contact": {
    "required": false,
    "type": "string"
  },
  "mobile": {
    "required": false,
    "type": "string"
  },
  "email": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll():Promise<IQueryResult<IQuery, ICompanyView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, ICompanyView>>;
    }

    override async create(company:ICompanyCreate):Promise<ICompanyView> {        
        if (!company.id) {
            company.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(company) as Promise<ICompanyView>;
    }

    override async getById(id:string):Promise<ICompanyView> {
        return super.getById(id) as any;    
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