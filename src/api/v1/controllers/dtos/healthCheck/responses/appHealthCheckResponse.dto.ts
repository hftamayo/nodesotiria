import { HealthCheckResponseDto } from './healthCheckResponse.dto';

export interface AppHealthCheckResponseDto extends HealthCheckResponseDto {
  uptime: number;
  memoryUsage: {
    heapTotal: number;
    heapUsed: number;
    rss: number;
  };
}
