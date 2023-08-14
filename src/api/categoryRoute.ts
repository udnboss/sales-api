import express from "express";
import { ICategoryCreate, ICategoryUpdate, ICategoryPartial, ICategoryView } from "./categoryInterfaces";
import { Environment, Context, MessageResponse, ErrorResponse, IQueryResult, IQuery, IDataQuery, IEntity } from "./base";
import { CategoryBusiness } from "./categoryBusiness";

export const categoryRouter = express.Router();

categoryRouter.use(express.json()); //ensure only json is accepted in post requests

const env = new Environment();
const context = new Context(env);
const business = new CategoryBusiness(context);

categoryRouter.get<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {

    var query:IDataQuery;

    try {
        query = business.convertToDataQuery(req.query);
    } catch (err) {
        return res.status(400).json({ success: false, message: `Bad query for category: ${err}` });
    }

    try {
        const results = await business.getAll(query) as IQueryResult<IQuery, ICategoryView>;
        const message = {
            success: true,
            message: "successful",
            data: results
        };
        return res.json(message);
    } catch (err) {
        return res.status(500).json({ success: false, message: `Could not retrieve category records: ${err}` });
    }    
});

categoryRouter.post<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {
    try {
        business.isCreate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid category entity: ${err}` });
        return;
    }
    // if (!business.isCreate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid category" });
    //     return;
    // }
    
    var entity = {} as IEntity;
    try {
        entity = await business.create(req.body as ICategoryCreate);
    } catch (err) {
        if (err.includes('UNIQUE constraint failed')) {
            res.status(405).json({ success: false, message: `category entity could not be created: ${err}` });
        } else {
            res.status(405).json({ success: false, message: "category entity could not be created" });
        }  
        return;  
    }

    if (!entity) {
        res.status(405).json({ success: false, message: "category entity could not be created" });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ICategoryView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

categoryRouter.get<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    try {
        const viewEntity = await business.getById(id, 2) as ICategoryView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) { //TODO: a meaningful error code should explain what happened so we can either return 404, 403, or 500.
        return res.status(404).json({ success: false, message: "category entity not found" });
    }
});

categoryRouter.put<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isUpdate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid category entity: ${err}` });
        return;
    }
    // if (!business.isUpdate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid category" });
    //     return;
    // }
    const id = (req.params as IEntity).id;
    var entity:ICategoryView;
    try {
        entity = await business.update(id, req.body as ICategoryUpdate);
        if (entity == null) {
            res.status(404).json({ success: false, message: `category entity could not be updated for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `category entity could not be updated for given id ${id}: ${err}` });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ICategoryView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

categoryRouter.patch<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isPartial(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid category entity: ${err}` });
        return;
    }
    // if (!business.isPartial(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid category" });
    //     return;
    // }

    const id = (req.params as IEntity).id;
    var entity:ICategoryView;
    try {
        entity = await business.modify(id, req.body as ICategoryPartial);
        if (entity == null) {
            res.status(404).json({ success: false, message: `category entity could not be modified for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `category entity could not be modified for given id ${id}: ${err}` });
        return;
    }
    
    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ICategoryView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

categoryRouter.delete<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    var viewEntity:ICategoryView;

    try {
        viewEntity = await business.getById(id) as ICategoryView;
    } catch (err) {
        res.status(404).json({ success: false, message: `category entity not found for given id ${id}` });
        return;
    }
    try {
        const entity = await business.delete(id);
        if (entity == null) {
            res.status(404).json({ success: false, message: "category entity could not be deleted" });
            return;
        }    
    } catch (err) {
        res.status(404).json({ success: false, message: `category entity could not be deleted: ${err}` });
        return;
    }
    
    
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});