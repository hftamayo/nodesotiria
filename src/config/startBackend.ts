import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection, setCorsEnviro } from './setup';
import { port } from './envvars';

import SeedDatabase from '../shared/utils/dataseed/SeedDatabase';
import roleRouter from '../api/v1/routes/roleRoutes';
import userRouter from '../api/v1/routes/userRoutes';
import hcRouter from '../api/v1/routes/hcRoutes';

const app = express();

const PORT = port || 5001;

async function startBE() {
  try {
    await dbConnection();
    app.use(cors(setCorsEnviro));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); //cuando false?
    app.use(cookieParser());

    app.use((req: Request, res: Response, next: NextFunction) => {
      //console.log('Request received: ', req.method, req.url);
      //console.log('Request headers: ', req.headers);
      next();
    });

    const seedDatabase = new SeedDatabase();
    await seedDatabase.seed();

    app.use('/nodesotiria/roles', roleRouter);
    app.use('/nodesotiria/users', userRouter);
    app.use('/nodesotiria/healthcheck', hcRouter);

    // Error handling middleware
    app.use((error: unknown, res: Response) => {
      if (error instanceof Error) {
        console.error('Error middleware: ', error.message);
        console.error('Error details: ', error.stack);
      } else {
        console.error('Error middleware: ', error);
      }
      res.status(500).send('An unexpected error occurred');
    });

    //console.log(`the backend is ready in ${mode} environment`);
    const server = app.listen(port, () => {
      console.log(`The server instance is running on port ${PORT}`);
    });
    return server;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('the backend is down: ', error.message);
    } else {
      console.error('the backend is down: ', error);
    }
    process.exit(1);
  }
}

export { app, startBE };
