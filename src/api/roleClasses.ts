import { Entity } from "./base";



export class Role extends Entity {
    name:string;
}

export class RoleCreate extends Entity {
    name:string;
}

export class RoleUpdate extends Entity {
    name:string;
}

export class RolePartial extends Entity {
    name?:string;
}

export class RoleView extends Entity {
    name?:string;
}