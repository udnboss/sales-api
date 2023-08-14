
//import { Rolepermission, RolepermissionCreate, RolepermissionUpdate, RolepermissionPartial, RolepermissionView } from "./rolePermissionClasses"
import { IRolepermissionCreate, IRolepermissionUpdate, IRolepermissionPartial, IRolepermissionView } from "./rolePermissionInterfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IQueryResult, IQuery, Context, Business, IDataQuery, ICondition, Operator } from "./base";
import { randomUUID } from "crypto";

import { PermissionBusiness } from "./permissionBusiness";
import { RoleBusiness } from "./roleBusiness";

export class RolepermissionBusiness extends Business<IRolepermissionView> {

    constructor(context:Context) {
        super(context, "rolePermission");
    }
    // override idProperty:string = 'id';
    override createProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "role_id": {
    "required": true,
    "type": "string"
  },
  "permission_id": {
    "required": true,
    "type": "string"
  }
};
    override updateProperties: any = {
  "id": {
    "required": true,
    "type": "string"
  },
  "role_id": {
    "required": true,
    "type": "string"
  },
  "permission_id": {
    "required": true,
    "type": "string"
  }
};
    override partialProperties: any = {
  "id": {
    "required": false,
    "type": "string"
  },
  "role_id": {
    "required": false,
    "type": "string"
  },
  "permission_id": {
    "required": false,
    "type": "string"
  }
};
    override queryProperties: any = {};
    
    override async getAll(query:IDataQuery, maxDepth:number = 1):Promise<IQueryResult<IQuery, IRolepermissionView>> {
        return super.getAll(query, maxDepth) as Promise<IQueryResult<IQuery, IRolepermissionView>>;
    }

    override async create(rolePermission:IRolepermissionCreate):Promise<IRolepermissionView> {        
        if (!rolePermission.id) {
            rolePermission.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(rolePermission) as Promise<IRolepermissionView>;
    }

    override async getById(id:string, maxDepth:number = 1):Promise<IRolepermissionView> {
        const rolePermission = await super.getById(id);

        maxDepth--;

        if (rolePermission.role_id) { rolePermission.role = await new RoleBusiness(this.context).getById(rolePermission.role_id); }
        if (rolePermission.permission_id) { rolePermission.permission = await new PermissionBusiness(this.context).getById(rolePermission.permission_id); }
        
        if (maxDepth) {
          
        
          maxDepth--;
        }

        return rolePermission;    
    }

    override async update(id:string, rolePermission:IRolepermissionUpdate):Promise<IRolepermissionView> {
        return super.update(id, rolePermission) as Promise<IRolepermissionView>;
    }

    override async modify(id:string, rolePermission:IRolepermissionPartial):Promise<IRolepermissionView> {
        return super.modify(id, rolePermission) as Promise<IRolepermissionView>;    
    }

    override async delete(id:string):Promise<IRolepermissionView> {
        return super.delete(id) as Promise<IRolepermissionView>;
    }
}