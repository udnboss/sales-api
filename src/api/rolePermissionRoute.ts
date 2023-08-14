import express from "express";
import { IRolepermissionCreate, IRolepermissionUpdate, IRolepermissionPartial, IRolepermissionView } from "./rolePermissionInterfaces";
import { Environment, Context, MessageResponse, ErrorResponse, IQueryResult, IQuery, IDataQuery, IEntity } from "./base";
import { RolepermissionBusiness } from "./rolePermissionBusiness";

export const rolePermissionRouter = express.Router();

rolePermissionRouter.use(express.json()); //ensure only json is accepted in post requests

const env = new Environment();
const context = new Context(env);
const business = new RolepermissionBusiness(context);

rolePermissionRouter.get<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {

    var query:IDataQuery;

    try {
        query = business.convertToDataQuery(req.query);
    } catch (err) {
        return res.status(400).json({ success: false, message: `Bad query for rolePermission: ${err}` });
    }

    try {
        const results = await business.getAll(query) as IQueryResult<IQuery, IRolepermissionView>;
        const message = {
            success: true,
            message: "successful",
            data: results
        };
        return res.json(message);
    } catch (err) {
        return res.status(500).json({ success: false, message: `Could not retrieve rolePermission records: ${err}` });
    }    
});

rolePermissionRouter.post<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {
    try {
        business.isCreate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid rolePermission entity: ${err}` });
        return;
    }
    // if (!business.isCreate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid rolePermission" });
    //     return;
    // }
    
    var entity = {} as IEntity;
    try {
        entity = await business.create(req.body as IRolepermissionCreate);
    } catch (err) {
        if (err.includes('UNIQUE constraint failed')) {
            res.status(405).json({ success: false, message: `rolePermission entity could not be created: ${err}` });
        } else {
            res.status(405).json({ success: false, message: "rolePermission entity could not be created" });
        }  
        return;  
    }

    if (!entity) {
        res.status(405).json({ success: false, message: "rolePermission entity could not be created" });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as IRolepermissionView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

rolePermissionRouter.get<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    try {
        const viewEntity = await business.getById(id, 2) as IRolepermissionView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) { //TODO: a meaningful error code should explain what happened so we can either return 404, 403, or 500.
        return res.status(404).json({ success: false, message: "rolePermission entity not found" });
    }
});

rolePermissionRouter.put<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isUpdate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid rolePermission entity: ${err}` });
        return;
    }
    // if (!business.isUpdate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid rolePermission" });
    //     return;
    // }
    const id = (req.params as IEntity).id;
    var entity:IRolepermissionView;
    try {
        entity = await business.update(id, req.body as IRolepermissionUpdate);
        if (entity == null) {
            res.status(404).json({ success: false, message: `rolePermission entity could not be updated for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `rolePermission entity could not be updated for given id ${id}: ${err}` });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as IRolepermissionView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

rolePermissionRouter.patch<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isPartial(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid rolePermission entity: ${err}` });
        return;
    }
    // if (!business.isPartial(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid rolePermission" });
    //     return;
    // }

    const id = (req.params as IEntity).id;
    var entity:IRolepermissionView;
    try {
        entity = await business.modify(id, req.body as IRolepermissionPartial);
        if (entity == null) {
            res.status(404).json({ success: false, message: `rolePermission entity could not be modified for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `rolePermission entity could not be modified for given id ${id}: ${err}` });
        return;
    }
    
    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as IRolepermissionView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

rolePermissionRouter.delete<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    var viewEntity:IRolepermissionView;

    try {
        viewEntity = await business.getById(id) as IRolepermissionView;
    } catch (err) {
        res.status(404).json({ success: false, message: `rolePermission entity not found for given id ${id}` });
        return;
    }
    try {
        const entity = await business.delete(id);
        if (entity == null) {
            res.status(404).json({ success: false, message: "rolePermission entity could not be deleted" });
            return;
        }    
    } catch (err) {
        res.status(404).json({ success: false, message: `rolePermission entity could not be deleted: ${err}` });
        return;
    }
    
    
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});