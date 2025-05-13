import express, { Request, Response } from 'express';
import { HealthCheckController } from '../controllers/HealthCheckController';
import { healthCheckValidation } from '../middlewares/validation/healthCheck.validation';
import { ValidationMiddleware } from '../middlewares/errorHandler.middleware';

const hcRouter = express.Router();
const healthCheckController = new HealthCheckController();

hcRouter.get(
  '/app',
  healthCheckValidation,
  ValidationMiddleware.validate,
  async (req: Request, res: Response): Promise<void> => {
    await healthCheckController.appHealthCheck(req, res);
  },
);
hcRouter.get(
  '/db',
  healthCheckValidation,
  ValidationMiddleware.validate,
  async (req: Request, res: Response): Promise<void> => {
    await healthCheckController.dbHealthCheck(req, res);
  },
);
export default hcRouter;
