import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection, setCorsEnviro } from './enviro.js';
import { ServerProps } from '../../../shared/types/server.type.js';
//import { port, mode } from './envvars.js';

const dbLayerMicroService: express.Application = express();
//const PORT = port;

async function startBackend(): Promise<ServerProps> {
  try {
    const db = await dbConnection();
    dbLayerMicroService.use(cors(setCorsEnviro));
    dbLayerMicroService.use(express.json());
    dbLayerMicroService.use(express.urlencoded({ extended: true }));
    dbLayerMicroService.use(cookieParser());

    //method for monitoring and logging
    dbLayerMicroService.use(
      (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request received: [${req.method}] ${req.path}`);
        console.log(`Request headers: ${JSON.stringify(req.headers)}`);
        next();
      },
    );
    return { server: dbLayerMicroService, db };
  } catch (error: unknown) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
}

export { dbLayerMicroService, startBackend };
