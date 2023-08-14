
//import { Sale, SaleCreate, SaleUpdate, SalePartial, SaleView } from "./saleClasses"
import { ISaleCreate, ISaleUpdate, ISalePartial, ISaleView } from "./saleInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";

import { SaleitemBusiness } from "./saleItemBusiness";
import { CustomerBusiness } from "./customerBusiness";
import { CurrencyBusiness } from "./currencyBusiness";
import { AccountBusiness } from "./accountBusiness";
import { CompanyBusiness } from "./companyBusiness";

export class SaleBusiness extends Business<ISaleView> {

    constructor(context:Context) {
        super(context, "sale");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "company_id": {
    "required": true,
    "type": "string"
  },
  "account_id": {
    "required": true,
    "type": "string"
  },
  "customer_id": {
    "required": true,
    "type": "string"
  },
  "currency_id": {
    "required": true,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "date": {
    "required": true,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": true,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    override updateProperties: any = {
  "company_id": {
    "required": true,
    "type": "string"
  },
  "account_id": {
    "required": true,
    "type": "string"
  },
  "customer_id": {
    "required": true,
    "type": "string"
  },
  "currency_id": {
    "required": true,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": true,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    override partialProperties: any = {
  "company_id": {
    "required": false,
    "type": "string"
  },
  "account_id": {
    "required": false,
    "type": "string"
  },
  "customer_id": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": false,
    "type": "string"
  },
  "place": {
    "required": false,
    "type": "string"
  },
  "reference": {
    "required": false,
    "type": "string"
  },
  "confirmed": {
    "required": false,
    "type": "boolean"
  },
  "reference_date": {
    "required": false,
    "type": "string"
  },
  "due_date": {
    "required": false,
    "type": "string"
  }
};
    override queryProperties: any = {
  "number": {
    "required": false,
    "type": "integer"
  },
  "date": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, ISaleView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, ISaleView>>;
    }

    override async create(sale:ISaleCreate):Promise<ISaleView> {        
        if (!sale.id) {
            sale.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(sale) as Promise<ISaleView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<ISaleView> {
        const sale = await super.getById(id);

        maxDepth--;

        if (sale.currency_id) { sale.currency = await new CurrencyBusiness(this.context).getById(sale.currency_id); }
        if (sale.customer_id) { sale.customer = await new CustomerBusiness(this.context).getById(sale.customer_id); }
        if (sale.account_id) { sale.account = await new AccountBusiness(this.context).getById(sale.account_id); }
        if (sale.company_id) { sale.company = await new CompanyBusiness(this.context).getById(sale.company_id); }
        
        if (maxDepth) {
          var querySaleitem = { where: [ { column: 'sale_id', operator: Operator.Equals, value: sale.id } as ICondition] } as IDataQuery;
          sale.items = (await new SaleitemBusiness(this.context).getAll(querySaleitem, maxDepth));
        
          maxDepth--;
        }

        return sale;    
    }

    override async update(id:string, sale:ISaleUpdate):Promise<ISaleView> {
        return super.update(id, sale) as Promise<ISaleView>;
    }

    override async modify(id:string, sale:ISalePartial):Promise<ISaleView> {
        return super.modify(id, sale) as Promise<ISaleView>;    
    }

    override async delete(id:string):Promise<ISaleView> {
        return super.delete(id) as Promise<ISaleView>;
    }
}