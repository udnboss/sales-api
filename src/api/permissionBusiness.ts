
//import { Permission, PermissionCreate, PermissionUpdate, PermissionPartial, PermissionView } from "./permissionClasses"
import { IPermissionCreate, IPermissionUpdate, IPermissionPartial, IPermissionView } from "./permissionInterfaces";
import { IQueryResult, IQuery, Context, Business } from "./base";
import { randomUUID } from "crypto";

export class PermissionBusiness extends Business<IPermissionView> {

    constructor(context:Context) {
        super(context, "permission");
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
  },
  "entity": {
    "required": true,
    "type": "string"
  },
  "action": {
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
  },
  "entity": {
    "required": true,
    "type": "string"
  },
  "action": {
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
  },
  "entity": {
    "required": false,
    "type": "string"
  },
  "action": {
    "required": false,
    "type": "string"
  }
};
    
    override async getAll():Promise<IQueryResult<IQuery, IPermissionView>> {
        return super.getAll() as Promise<IQueryResult<IQuery, IPermissionView>>;
    }

    override async create(permission:IPermissionCreate):Promise<IPermissionView> {        
        if (!permission.id) {
            permission.id = randomUUID(); //TODO: autonumber case
        }
        return super.create(permission) as Promise<IPermissionView>;
    }

    override async getById(id:string):Promise<IPermissionView> {
        return super.getById(id) as any;    
    }

    override async update(id:string, permission:IPermissionUpdate):Promise<IPermissionView> {
        return super.update(id, permission) as Promise<IPermissionView>;
    }

    override async modify(id:string, permission:IPermissionPartial):Promise<IPermissionView> {
        return super.modify(id, permission) as Promise<IPermissionView>;    
    }

    override async delete(id:string):Promise<IPermissionView> {
        return super.delete(id) as Promise<IPermissionView>;
    }
}