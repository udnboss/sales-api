import express from "express";
import { ISaleCreate, ISaleUpdate, ISalePartial, ISaleView } from "./saleInterfaces";
import { Environment, Context, MessageResponse, ErrorResponse, IQueryResult, IQuery, IDataQuery, IEntity } from "./base";
import { SaleBusiness } from "./saleBusiness";

export const saleRouter = express.Router();

saleRouter.use(express.json()); //ensure only json is accepted in post requests

const env = new Environment();
const context = new Context(env);
const business = new SaleBusiness(context);

saleRouter.get<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {

    var query:IDataQuery;

    try {
        query = business.convertToDataQuery(req.query);
    } catch (err) {
        return res.status(400).json({ success: false, message: `Bad query for sale: ${err}` });
    }

    try {
        const results = await business.getAll(query) as IQueryResult<IQuery, ISaleView>;
        const message = {
            success: true,
            message: "successful",
            data: results
        };
        return res.json(message);
    } catch (err) {
        return res.status(500).json({ success: false, message: `Could not retrieve sale records: ${err}` });
    }    
});

saleRouter.post<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {
    try {
        business.isCreate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid sale entity: ${err}` });
        return;
    }
    // if (!business.isCreate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid sale" });
    //     return;
    // }
    
    var entity = {} as IEntity;
    try {
        entity = await business.create(req.body as ISaleCreate);
    } catch (err) {
        if (err.includes('UNIQUE constraint failed')) {
            res.status(405).json({ success: false, message: `sale entity could not be created: ${err}` });
        } else {
            res.status(405).json({ success: false, message: "sale entity could not be created" });
        }  
        return;  
    }

    if (!entity) {
        res.status(405).json({ success: false, message: "sale entity could not be created" });
        return;
    }

    try {
        const viewEntity = await business.getById(entity.id, 2) as ISaleView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "sale entity could not be retrieved after being created" });
        return;
    }
});

saleRouter.get<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    try {
        const viewEntity = await business.getById(id, 2) as ISaleView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) { //TODO: a meaningful error code should explain what happened so we can either return 404, 403, or 500.
        return res.status(404).json({ success: false, message: "sale entity not found" });
    }
});

saleRouter.put<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isUpdate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid sale entity: ${err}` });
        return;
    }
    // if (!business.isUpdate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid sale" });
    //     return;
    // }
    const id = (req.params as IEntity).id;
    var entity:ISaleView;
    try {
        entity = await business.update(id, req.body as ISaleUpdate);
        if (entity == null) {
            res.status(404).json({ success: false, message: `sale entity could not be updated for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `sale entity could not be updated for given id ${id}: ${err}` });
        return;
    }

    try {
        const viewEntity = await business.getById(entity.id, 2) as ISaleView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "sale entity could not be retrieved after being created" });
        return;
    }
});

saleRouter.patch<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isPartial(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid sale entity: ${err}` });
        return;
    }
    // if (!business.isPartial(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid sale" });
    //     return;
    // }

    const id = (req.params as IEntity).id;
    var entity:ISaleView;
    try {
        entity = await business.modify(id, req.body as ISalePartial);
        if (entity == null) {
            res.status(404).json({ success: false, message: `sale entity could not be modified for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `sale entity could not be modified for given id ${id}: ${err}` });
        return;
    }
    
    try {
        const viewEntity = await business.getById(entity.id, 2) as ISaleView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) {
        res.status(500).json({ success: false, message: "sale entity could not be retrieved after being created" });
        return;
    }
});

saleRouter.delete<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    var viewEntity:ISaleView;

    try {
        viewEntity = await business.getById(id) as ISaleView;
    } catch (err) {
        res.status(404).json({ success: false, message: `sale entity not found for given id ${id}` });
        return;
    }
    try {
        const entity = await business.delete(id);
        if (entity == null) {
            res.status(404).json({ success: false, message: "sale entity could not be deleted" });
            return;
        }    
    } catch (err) {
        res.status(404).json({ success: false, message: `sale entity could not be deleted: ${err}` });
        return;
    }
    
    
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});