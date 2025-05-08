import { Request, Response } from 'express';
import { GetAppHealthQuery } from '../../../services/queries/healthCheck/getAppHealthQuery';
import { GetDbHealthQuery } from '../../../services/queries/healthCheck/getDBHealthQuery';
import { LogExecution } from '../../../decorators/logging';

export class HealthCheckController {
  private readonly appHealthQuery: GetAppHealthQuery;
  private readonly dbHealthQuery: GetDbHealthQuery;

  constructor() {
    this.appHealthQuery = new GetAppHealthQuery();
    this.dbHealthQuery = new GetDbHealthQuery();
  }

  @LogExecution()
  async appHealthCheck(req: Request, res: Response): Promise<void> {
    const result = await this.appHealthQuery.execute();
    res.status(200).json(result);
  }

  @LogExecution()
  async dbHealthCheck(req: Request, res: Response): Promise<void> {
    const result = await this.dbHealthQuery.execute();
    const statusCode = result.error ? 500 : 200;
    res.status(statusCode).json(result);
  }
}
