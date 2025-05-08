import { AppHealthCheckResponseDto } from '../../../api/v1/controllers/dtos/healthCheck';

export class GetAppHealthQuery {
  async execute(): Promise<AppHealthCheckResponseDto> {
    return {
      message: 'HealthCheck: Application is up and running',
      timestamp: new Date().toISOString(),
      status: 'healthy',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }
}
