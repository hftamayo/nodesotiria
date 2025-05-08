export interface HealthCheckResponseDto {
  message: string;
  timestamp: string;
  status: 'healthy' | 'unhealthy';
}
