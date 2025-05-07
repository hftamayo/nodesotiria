import express from 'express';
import { HealthCheckController } from '../controllers/HealthCheckController';

const hcRouter = express.Router();
const healthCheckController = new HealthCheckController();

hcRouter.get('/app', (req, res) =>
  healthCheckController.appHealthCheck(req, res),
);
hcRouter.get('/db', (req, res) =>
  healthCheckController.dbHealthCheck(req, res),
);
export default hcRouter;
