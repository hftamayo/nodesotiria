import prisma from '../api/v1/prismaClient';
import { EnvironmentConfig } from './environment';

const envConfig = EnvironmentConfig.getInstance();

const dbConnection = async () => {
  try {
    await prisma.$connect();
    const dbStatus = await prisma.$queryRaw<
      { result: number }[]
    >`SELECT 1+1 as result`;
    if (dbStatus[0].result !== 2) {
      throw new Error('Database connection error');
    }
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection error: ' + (error as Error).message);
    process.exit(1);
  }
};

const setCorsEnviro = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    console.log(`CORS requested from origin: ${origin}`);
    const { whitelist } = envConfig.getCorsConfig();
    if (whitelist.indexOf(origin || '') !== -1 || !origin) {
      console.log(`CORS requested from origin: ${origin} granted`);
      callback(null, true);
    } else {
      callback(
        new Error(`CORS requested from origin: ${origin} denied`),
        false,
      );
    }
  },
  //credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials',
    'Origin',
    'withCredentials',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-HTTP-Method-Override',
    'Set-Cookie',
    'Cookie',
    'Request',
  ],
};
export { dbConnection, setCorsEnviro };
