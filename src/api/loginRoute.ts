import express from "express";
import { ILoginCreate, ILoginUpdate, ILoginPartial, ILoginView } from "./loginInterfaces";
import { Environment, Context, MessageResponse, ErrorResponse, IQueryResult, IQuery, IDataQuery, IEntity } from "./base";
import { LoginBusiness } from "./loginBusiness";

export const loginRouter = express.Router();

loginRouter.use(express.json()); //ensure only json is accepted in post requests

const env = new Environment();
const context = new Context(env);
const business = new LoginBusiness(context);

loginRouter.get<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {

    var query:IDataQuery;

    try {
        query = business.convertToDataQuery(req.query);
    } catch (err) {
        return res.status(400).json({ success: false, message: `Bad query for login: ${err}` });
    }

    try {
        const results = await business.getAll(query) as IQueryResult<IQuery, ILoginView>;
        const message = {
            success: true,
            message: "successful",
            data: results
        };
        return res.json(message);
    } catch (err) {
        return res.status(500).json({ success: false, message: `Could not retrieve login records: ${err}` });
    }    
});

loginRouter.post<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {
    try {
        business.isCreate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid login entity: ${err}` });
        return;
    }
    // if (!business.isCreate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid login" });
    //     return;
    // }
    
    var entity = {} as IEntity;
    try {
        entity = await business.create(req.body as ILoginCreate);
    } catch (err) {
        if (err.includes('UNIQUE constraint failed')) {
            res.status(405).json({ success: false, message: `login entity could not be created: ${err}` });
        } else {
            res.status(405).json({ success: false, message: "login entity could not be created" });
        }  
        return;  
    }

    if (!entity) {
        res.status(405).json({ success: false, message: "login entity could not be created" });
        return;
    }

    try {
        const viewEntity = await business.getById(entity.id, 2) as ILoginView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "login entity could not be retrieved after being created" });
        return;
    }
});

loginRouter.get<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    try {
        const viewEntity = await business.getById(id, 2) as ILoginView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) { //TODO: a meaningful error code should explain what happened so we can either return 404, 403, or 500.
        return res.status(404).json({ success: false, message: "login entity not found" });
    }
});

loginRouter.put<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isUpdate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid login entity: ${err}` });
        return;
    }
    // if (!business.isUpdate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid login" });
    //     return;
    // }
    const id = (req.params as IEntity).id;
    var entity:ILoginView;
    try {
        entity = await business.update(id, req.body as ILoginUpdate);
        if (entity == null) {
            res.status(404).json({ success: false, message: `login entity could not be updated for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `login entity could not be updated for given id ${id}: ${err}` });
        return;
    }

    try {
        const viewEntity = await business.getById(entity.id, 2) as ILoginView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "login entity could not be retrieved after being created" });
        return;
    }
});

loginRouter.patch<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isPartial(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid login entity: ${err}` });
        return;
    }
    // if (!business.isPartial(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid login" });
    //     return;
    // }

    const id = (req.params as IEntity).id;
    var entity:ILoginView;
    try {
        entity = await business.modify(id, req.body as ILoginPartial);
        if (entity == null) {
            res.status(404).json({ success: false, message: `login entity could not be modified for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `login entity could not be modified for given id ${id}: ${err}` });
        return;
    }
    
    try {
        const viewEntity = await business.getById(entity.id, 2) as ILoginView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "login entity could not be retrieved after being created" });
        return;
    }
});

loginRouter.delete<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    var viewEntity:ILoginView;

    try {
        viewEntity = await business.getById(id) as ILoginView;
    } catch (err) {
        res.status(404).json({ success: false, message: `login entity not found for given id ${id}` });
        return;
    }
    try {
        const entity = await business.delete(id);
        if (entity == null) {
            res.status(404).json({ success: false, message: "login entity could not be deleted" });
            return;
        }    
    } catch (err) {
        res.status(404).json({ success: false, message: `login entity could not be deleted: ${err}` });
        return;
    }
    
    
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});