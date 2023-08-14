
//import { Customer, CustomerCreate, CustomerUpdate, CustomerPartial, CustomerView } from "./customerClasses"
import { ICustomerCreate, ICustomerUpdate, ICustomerPartial, ICustomerView } from "./customerInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";

import { SaleBusiness } from "./saleBusiness";
import { CurrencyBusiness } from "./currencyBusiness";

export class CustomerBusiness extends Business<ICustomerView> {

    constructor(context:Context) {
        super(context, "customer");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "address": {
    "required": false,
    "type": "string"
  },
  "contact": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": false,
    "type": "string"
  },
  "payment_term": {
    "required": false,
    "type": "integer"
  }
};
    override updateProperties: any = {
  "name": {
    "required": true,
    "type": "string"
  },
  "address": {
    "required": false,
    "type": "string"
  },
  "contact": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": false,
    "type": "string"
  },
  "payment_term": {
    "required": false,
    "type": "integer"
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
  "contact": {
    "required": false,
    "type": "string"
  },
  "currency_id": {
    "required": false,
    "type": "string"
  },
  "payment_term": {
    "required": false,
    "type": "integer"
  }
};
    override queryProperties: any = {
  "name": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, ICustomerView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, ICustomerView>>;
    }

    override async create(customer:ICustomerCreate):Promise<ICustomerView> {        
        if (!customer.id) {
            customer.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(customer) as Promise<ICustomerView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<ICustomerView> {
        const customer = await super.getById(id);

        maxDepth--;

        if (customer.currency_id) { customer.currency = await new CurrencyBusiness(this.context).getById(customer.currency_id); }
        
        if (maxDepth) {
          var querySale = { where: [ { column: 'customer_id', operator: Operator.Equals, value: customer.id } as ICondition] } as IDataQuery;
          customer.sales = (await new SaleBusiness(this.context).getAll(querySale, maxDepth));
        
          maxDepth--;
        }

        return customer;    
    }

    override async update(id:string, customer:ICustomerUpdate):Promise<ICustomerView> {
        return super.update(id, customer) as Promise<ICustomerView>;
    }

    override async modify(id:string, customer:ICustomerPartial):Promise<ICustomerView> {
        return super.modify(id, customer) as Promise<ICustomerView>;    
    }

    override async delete(id:string):Promise<ICustomerView> {
        return super.delete(id) as Promise<ICustomerView>;
    }
}