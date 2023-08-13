
//import { Sale, SaleCreate, SaleUpdate, SalePartial, SaleView } from "./saleClasses"
import { ISaleCreate, ISaleUpdate, ISalePartial, ISaleView } from "./saleInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";

import { AccountBusiness } from "./accountBusiness";
import { CurrencyBusiness } from "./currencyBusiness";
import { SaleitemBusiness } from "./saleItemBusiness";
import { CustomerBusiness } from "./customerBusiness";
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
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, ISaleView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, ISaleView>>;
    }

    override async create(sale:ISaleCreate):Promise<ISaleView> {        
        if (!sale.id) {
            sale.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(sale) as Promise<ISaleView>;
    }

    override async getById(id:string):Promise<ISaleView> {
        const sale = await super.getById(id);

        if (sale.currency) { sale.currency = await new CurrencyBusiness(this.context).getById(sale.currency_id); }

        if (sale.customer) { sale.customer = await new CustomerBusiness(this.context).getById(sale.customer_id); }

        if (sale.account) { sale.account = await new AccountBusiness(this.context).getById(sale.account_id); }

        if (sale.company) { sale.company = await new CompanyBusiness(this.context).getById(sale.company_id); }

        sale.items = (await new SaleitemBusiness(this.context).getAll([ { column: 'sale_id', operator: Operator.Equals, value: sale.id } as ICondition])).result;

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