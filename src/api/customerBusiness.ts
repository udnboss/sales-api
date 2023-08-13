
//import { Customer, CustomerCreate, CustomerUpdate, CustomerPartial, CustomerView } from "./customerClasses"
import { ICustomerCreate, ICustomerUpdate, ICustomerPartial, ICustomerView } from "./customerInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
import { randomUUID } from "crypto";

import { CurrencyBusiness } from "./currencyBusiness";
import { SaleBusiness } from "./saleBusiness";

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
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, ICustomerView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, ICustomerView>>;
    }

    override async create(customer:ICustomerCreate):Promise<ICustomerView> {        
        if (!customer.id) {
            customer.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(customer) as Promise<ICustomerView>;
    }

    override async getById(id:string):Promise<ICustomerView> {
        const customer = await super.getById(id);

        if (customer.currency) { customer.currency = await new CurrencyBusiness(this.context).getById(customer.currency_id); }

        customer.sales = (await new SaleBusiness(this.context).getAll([ { column: 'customer_id', operator: Operator.Equals, value: customer.id } as ICondition])).result;

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