import { HealthCheckResponseDto } from './healthCheckResponse.dto';

export interface DbHealthCheckResponseDto extends HealthCheckResponseDto {
  connectionStatus: boolean;
  latency?: number;
  error?: string;
}
