export class GetAppHealthQuery {
  async execute() {
    return {
      message: 'HealthCheck: Application is up and running',
      timestamp: new Date().toISOString(),
    };
  }
}
