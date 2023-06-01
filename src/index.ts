require('dotenv').config();

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import { AppDataSource } from './utils/data-source';
import validateEnv from './utils/validateEnv';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api/api.routes';
import authRouter from './routes/auth.routes';

AppDataSource.initialize().then(async () => {
  validateEnv();

  const app: Application = express();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: 'Hello World!',
    });
  });

  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

  app.all('*', (req: Request, res: Response) => {
    res.status(404).send(`Route ${req.originalUrl} not found`);
  });

  const port = config.get<number>('port');

  try {
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
});
