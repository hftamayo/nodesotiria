import dotenv from 'dotenv';
import { LogExecution } from '../decorators/logging';

export class EnvironmentConfig {
  private static instance: EnvironmentConfig;

  private constructor() {
    this.initialize();
  }

  @LogExecution()
  private initialize() {
    dotenv.config();
    this.validateRequiredVariables();
    this.setupDatabaseUrl();
  }

  static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }

    return EnvironmentConfig.instance;
  }

  private validateRequiredVariables() {
    const required = [
      'BACKEND_PORT',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_DB',
      'POSTGRES_HOST',
      'POSTGRES_PORT',
      'EXEC_MODE',
      'FRONTEND_ORIGINS',
      'SEED_DEVELOPMENT',
      'SEED_PRODUCTION',
      'DATABASE_URL',
      'ADMIN_PWORD',
      'SUPERVISOR_PWORD',
      'USER1_PWORD',
    ];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`,
      );
    }
  }

  private setupDatabaseUrl() {
    const dbUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
    process.env.DATABASE_URL = dbUrl;
  }

  getPort(): number {
    const port = parseInt(process.env.BACKEND_PORT ?? '8003');
    if (isNaN(port)) {
      throw new Error('Invalid PORT environment variable');
    }
    return port;
  }

  getDatabaseUrl(): string {
    return process.env.DATABASE_URL!;
  }

  getMode(): string {
    return process.env.EXEC_MODE!;
  }

  getCorsConfig() {
    return {
      whitelist: (process.env.FRONTEND_ORIGINS ?? '').split(','),
      secure: this.getMode() === 'production',
      sameSite: this.getMode() === 'production' ? 'none' : 'lax',
    };
  }

  getSeeding() {
    return {
      development: process.env.SEED_DEVELOPMENT === 'true',
      production: process.env.SEED_PRODUCTION === 'true',
    };
  }

  // getAuth() {
  //   return {
  //     masterKey: process.env.JWT_SECRET!,
  //     refreshKey: process.env.JWT_FRESH!
  //   };
  // }

  getDefaultPasswords() {
    return {
      admin: process.env.ADMIN_PWORD!,
      supervisor: process.env.SUPERVISOR_PWORD!,
      user: process.env.USER1_PWORD!,
    };
  }
}
