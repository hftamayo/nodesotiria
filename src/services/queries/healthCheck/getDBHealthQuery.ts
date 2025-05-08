import { DbHealthCheckResponseDto } from '../../../api/v1/controllers/dtos/healthCheck';
import { dbConnection } from '../../../config/setup';

export class GetDbHealthQuery {
  async execute(): Promise<DbHealthCheckResponseDto> {
    try {
      const startTime = Date.now();
      await dbConnection();
      const latency = Date.now() - startTime;

      return {
        message:
          'HealthCheck: The connection to the data layer is up and running',
        timestamp: new Date().toISOString(),
        status: 'healthy',
        connectionStatus: true,
        latency,
      };
    } catch (error: unknown) {
      return {
        message: 'HealthCheck: The connection to the data layer is down',
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        connectionStatus: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
