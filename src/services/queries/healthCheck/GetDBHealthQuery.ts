import { dbConnection } from '../../../config/setup';

export class GetDbHealthQuery {
  async execute() {
    try {
      await dbConnection();
      return {
        message:
          'HealthCheck: The connection to the data layer is up and running',
        timestamp: new Date().toISOString(),
      };
    } catch (error: unknown) {
      return {
        message: 'HealthCheck: The connection to the data layer is down',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : error,
      };
    }
  }
}
