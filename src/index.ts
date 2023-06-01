require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import { AppDataSource } from './utils/data-source';
import validateEnv from './utils/validateEnv';
import cookieParser from 'cookie-parser';
import AppError from './utils/appError';


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

  app.post('/post', async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    return res.status(200).send({
      message: 'Hello World from post!',
    });
  });

  // UNHANDLED ROUTE
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use((error: AppError, req: Request, res: Response) => {
    error.status = error.status || 'error';
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  });

  const port = config.get<number>('port');

  try {
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
});
