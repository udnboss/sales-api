import express from "express";
import { ISaleitemCreate, ISaleitemUpdate, ISaleitemPartial, ISaleitemView } from "./saleItemInterfaces";
import { Environment, Context, MessageResponse, ErrorResponse, IQueryResult, IQuery, IDataQuery, IEntity } from "./base";
import { SaleitemBusiness } from "./saleItemBusiness";

export const saleItemRouter = express.Router();

saleItemRouter.use(express.json()); //ensure only json is accepted in post requests

const env = new Environment();
const context = new Context(env);
const business = new SaleitemBusiness(context);

saleItemRouter.get<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {

    var query:IDataQuery;

    try {
        query = business.convertToDataQuery(req.query);
    } catch (err) {
        return res.status(400).json({ success: false, message: `Bad query for saleItem: ${err}` });
    }

    try {
        const results = await business.getAll(query) as IQueryResult<IQuery, ISaleitemView>;
        const message = {
            success: true,
            message: "successful",
            data: results
        };
        return res.json(message);
    } catch (err) {
        return res.status(500).json({ success: false, message: `Could not retrieve saleItem records: ${err}` });
    }    
});

saleItemRouter.post<{}, MessageResponse | ErrorResponse>("/", async (req, res) => {
    try {
        business.isCreate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid saleItem entity: ${err}` });
        return;
    }
    // if (!business.isCreate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid saleItem" });
    //     return;
    // }
    
    var entity = {} as IEntity;
    try {
        entity = await business.create(req.body as ISaleitemCreate);
    } catch (err) {
        if (err.includes('UNIQUE constraint failed')) {
            res.status(405).json({ success: false, message: `saleItem entity could not be created: ${err}` });
        } else {
            res.status(405).json({ success: false, message: "saleItem entity could not be created" });
        }  
        return;  
    }

    if (!entity) {
        res.status(405).json({ success: false, message: "saleItem entity could not be created" });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ISaleitemView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

saleItemRouter.get<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    try {
        const viewEntity = await business.getById(id, 2) as ISaleitemView;
        const message = {
            success: true,
            message: "successful",
            data: viewEntity
        };
        return res.json(message);
    } catch (err) { //TODO: a meaningful error code should explain what happened so we can either return 404, 403, or 500.
        return res.status(404).json({ success: false, message: "saleItem entity not found" });
    }
});

saleItemRouter.put<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isUpdate(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid saleItem entity: ${err}` });
        return;
    }
    // if (!business.isUpdate(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid saleItem" });
    //     return;
    // }
    const id = (req.params as IEntity).id;
    var entity:ISaleitemView;
    try {
        entity = await business.update(id, req.body as ISaleitemUpdate);
        if (entity == null) {
            res.status(404).json({ success: false, message: `saleItem entity could not be updated for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `saleItem entity could not be updated for given id ${id}: ${err}` });
        return;
    }

    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ISaleitemView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

saleItemRouter.patch<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    try {
        business.isPartial(req.body);
    } catch (err) {
        res.status(400).json({ success: false, message: `Invalid saleItem entity: ${err}` });
        return;
    }
    // if (!business.isPartial(req.body)) {
    //     res.status(400).json({ success: false, message: "Invalid saleItem" });
    //     return;
    // }

    const id = (req.params as IEntity).id;
    var entity:ISaleitemView;
    try {
        entity = await business.modify(id, req.body as ISaleitemPartial);
        if (entity == null) {
            res.status(404).json({ success: false, message: `saleItem entity could not be modified for given id ${id}` });
            return;
        }
    } catch (err) {
        res.status(405).json({ success: false, message: `saleItem entity could not be modified for given id ${id}: ${err}` });
        return;
    }
    
    //TODO: check for error
    const viewEntity = await business.getById(entity.id) as ISaleitemView;
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});

saleItemRouter.delete<{}, MessageResponse | ErrorResponse>("/:id", async (req, res) => {
    const id = (req.params as IEntity).id;
    var viewEntity:ISaleitemView;

    try {
        viewEntity = await business.getById(id) as ISaleitemView;
    } catch (err) {
        res.status(404).json({ success: false, message: `saleItem entity not found for given id ${id}` });
        return;
    }
    try {
        const entity = await business.delete(id);
        if (entity == null) {
            res.status(404).json({ success: false, message: "saleItem entity could not be deleted" });
            return;
        }    
    } catch (err) {
        res.status(404).json({ success: false, message: `saleItem entity could not be deleted: ${err}` });
        return;
    }
    
    
    const message = {
        success: true,
        message: "successful",
        data: viewEntity
    };
    res.json(message);
});