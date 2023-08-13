
//import { Rolepermission, RolepermissionCreate, RolepermissionUpdate, RolepermissionPartial, RolepermissionView } from "./rolePermissionClasses"
import { IRolepermissionCreate, IRolepermissionUpdate, IRolepermissionPartial, IRolepermissionView } from "./rolePermissionInterfaces";
import { IQueryResult, IQuery, Context, Business, Operator, ICondition, ISort } from "./base";
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
    
    override async getAll(where:ICondition[] = [], sort:ISort[] = []):Promise<IQueryResult<IQuery, IRolepermissionView>> {
        return super.getAll(where, sort) as Promise<IQueryResult<IQuery, IRolepermissionView>>;
    }

    override async create(rolePermission:IRolepermissionCreate):Promise<IRolepermissionView> {        
        if (!rolePermission.id) {
            rolePermission.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(rolePermission) as Promise<IRolepermissionView>;
    }

    override async getById(id:string):Promise<IRolepermissionView> {
        const rolePermission = await super.getById(id);

        if (rolePermission.role) { rolePermission.role = await new RoleBusiness(this.context).getById(rolePermission.role_id); }

        if (rolePermission.permission) { rolePermission.permission = await new PermissionBusiness(this.context).getById(rolePermission.permission_id); }

        

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