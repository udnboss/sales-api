
//import { Role, RoleCreate, RoleUpdate, RolePartial, RoleView } from "./roleClasses"
import { IRoleCreate, IRoleUpdate, IRolePartial, IRoleView } from "./roleInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";

import { RolepermissionBusiness } from "./rolePermissionBusiness";

export class RoleBusiness extends Business<IRoleView> {

    constructor(context:Context) {
        super(context, "role");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "name": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "name": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "id": {
    "required": false,
    "type": "string"
  },
  "name": {
    "required": false,
    "type": "string"
  }
};
    override queryProperties: any = {
  "name": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IRoleView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IRoleView>>;
    }

    override async create(role:IRoleCreate):Promise<IRoleView> {        
        if (!role.id) {
            role.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(role) as Promise<IRoleView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<IRoleView> {
        const role = await super.getById(id);

        maxDepth--;

        
        
        if (maxDepth) {
          var queryRolepermission = { where: [ { column: 'role_id', operator: Operator.Equals, value: role.id } as ICondition] } as IDataQuery;
          role.rolePermissions = (await new RolepermissionBusiness(this.context).getAll(queryRolepermission, maxDepth));
        
          maxDepth--;
        }

        return role;    
    }

    override async update(id:string, role:IRoleUpdate):Promise<IRoleView> {
        return super.update(id, role) as Promise<IRoleView>;
    }

    override async modify(id:string, role:IRolePartial):Promise<IRoleView> {
        return super.modify(id, role) as Promise<IRoleView>;    
    }

    override async delete(id:string):Promise<IRoleView> {
        return super.delete(id) as Promise<IRoleView>;
    }
}