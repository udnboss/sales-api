
//import { Rolepermission, RolepermissionCreate, RolepermissionUpdate, RolepermissionPartial, RolepermissionView } from "./rolePermissionClasses"
import { IRolepermissionCreate, IRolepermissionUpdate, IRolepermissionPartial, IRolepermissionView } from "./rolePermissionInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

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
    
    override async getAll():Promise<IQueryResult<IQuery, IRolepermissionView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, IRolepermissionView>>;
    }

    override async create(rolePermission:IRolepermissionCreate):Promise<IRolepermissionView> {        
        if (!rolePermission.id) {
            rolePermission.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(rolePermission) as Promise<IRolepermissionView>;
    }

    override async getById(id:string):Promise<IRolepermissionView> {
        return super.getById(id) as any;    
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