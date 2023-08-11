import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api/index';
import { MessageResponse } from './api/base';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    success: true,
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    data: null
  });
});

app.use('/api/v1', api);

import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import YAML from 'yaml';
const file = fs.readFileSync('./openapi/spec.yml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
