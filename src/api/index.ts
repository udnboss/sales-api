import express from 'express';
import { MessageResponse } from './base';
import * as middlewares from '../middlewares';

import { loginRouter } from './loginRoute';
import { userRouter } from './userRoute';
import { roleRouter } from './roleRoute';
import { permissionRouter } from './permissionRoute';
import { rolePermissionRouter } from './rolePermissionRoute';
import { accountRouter } from './accountRoute';
import { categoryRouter } from './categoryRoute';
import { companyRouter } from './companyRoute';
import { currencyRouter } from './currencyRoute';
import { customerRouter } from './customerRoute';
import { itemRouter } from './itemRoute';
import { saleRouter } from './saleRoute';
import { saleItemRouter } from './saleItemRoute';

const indexRouter = express.Router();
indexRouter.use(middlewares.authenticate);

indexRouter.use('/logins', loginRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/roles', roleRouter);
indexRouter.use('/permissions', permissionRouter);
indexRouter.use('/rolePermissions', rolePermissionRouter);
indexRouter.use('/accounts', accountRouter);
indexRouter.use('/categories', categoryRouter);
indexRouter.use('/companies', companyRouter);
indexRouter.use('/currencies', currencyRouter);
indexRouter.use('/customers', customerRouter);
indexRouter.use('/items', itemRouter);
indexRouter.use('/sales', saleRouter);
indexRouter.use('/saleItems', saleItemRouter);

indexRouter.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        success: true,
        message: 'API - 👋🌎🌍🌏',
        data: null
    });
});


export default indexRouter;