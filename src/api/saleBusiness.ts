
//import { Sale, SaleCreate, SaleUpdate, SalePartial, SaleView } from "./saleClasses"
import { ISaleCreate, ISaleUpdate, ISalePartial, ISaleView } from "./saleInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";

import { AccountBusiness } from "./accountBusiness";
import { CurrencyBusiness } from "./currencyBusiness";
import { CompanyBusiness } from "./companyBusiness";
import { SaleitemBusiness } from "./saleItemBusiness";
import { CustomerBusiness } from "./customerBusiness";

export class SaleBusiness extends Business<ISaleView> {

    constructor(context:Context) {
        super(context, "sale");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "company_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "account_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "customer_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "currency_id": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "place": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "date": {
    "required": true,
    "type": "string",
    "operator": "bt"
  },
  "reference": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "confirmed": {
    "required": true,
    "type": "boolean",
    "operator": "eq"
  },
  "reference_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  },
  "due_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  }
};
    override updateProperties: any = {
  "company_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "account_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "customer_id": {
    "required": true,
    "type": "string",
    "operator": "in"
  },
  "currency_id": {
    "required": true,
    "type": "string",
    "operator": "like"
  },
  "place": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "reference": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "confirmed": {
    "required": true,
    "type": "boolean",
    "operator": "eq"
  },
  "reference_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  },
  "due_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  }
};
    override partialProperties: any = {
  "company_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "account_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "customer_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "currency_id": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "place": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "reference": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "confirmed": {
    "required": false,
    "type": "boolean",
    "operator": "eq"
  },
  "reference_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  },
  "due_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  }
};
    override queryProperties: any = {
  "id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "company_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "account_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "customer_id": {
    "required": false,
    "type": "string",
    "operator": "in"
  },
  "currency_id": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "place": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "number": {
    "required": false,
    "type": "integer",
    "operator": "bt"
  },
  "date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  },
  "total": {
    "required": false,
    "type": "number",
    "operator": "bt"
  },
  "reference": {
    "required": false,
    "type": "string",
    "operator": "like"
  },
  "confirmed": {
    "required": false,
    "type": "boolean",
    "operator": "eq"
  },
  "reference_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
  },
  "due_date": {
    "required": false,
    "type": "string",
    "operator": "bt"
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