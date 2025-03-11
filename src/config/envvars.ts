import dotenv from 'dotenv';

dotenv.config();

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
const DATALAYER_NAME = process.env.DATALAYER_NAME;
const POSTGRES_PORT = process.env.POSTGRES_PORT;

const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATALAYER_NAME}:${POSTGRES_PORT}/${POSTGRES_DB}`;
process.env.DATABASE_URL = DATABASE_URL;

const port = parseInt(process.env.PORT ?? '8003');
if (isNaN(port)) {
  throw new Error('Invalid PORT enviroment variable, stopping the system');
}

const masterKey = process.env.JWT_SECRET;
const refreshKey = process.env.JWT_FRESH;
const mode = process.env.EXEC_MODE;

const whitelist_frontend = (process.env.FRONTEND_ORIGINS ?? '').split(',');
const cors_secure = mode === 'production';
const cors_samesite = mode === 'production' ? 'none' : 'lax';

const backend =
  mode === 'production' ? process.env.DB_URI_PROD : process.env.DB_URI_DEV;

const databaseUrl = process.env.DATABASE_URL;
const dataseeddev = process.env.SEED_DEVELOPMENT;
const dataseedprod = process.env.SEED_PRODUCTION;

const adminpword = process.env.ADMIN_PWORD;
const supervisorpword = process.env.SUPERVISOR_PWORD;
const userpword = process.env.USER1_PWORD;

export {
  port,
  masterKey,
  refreshKey,
  mode,
  backend,
  whitelist_frontend,
  cors_secure,
  cors_samesite,
  dataseeddev,
  dataseedprod,
  databaseUrl,
  adminpword,
  supervisorpword,
  userpword,
};

export const PERMISSIONS = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  UPDATE: 4,
  DELETE: 8,
  ALL: 15,
};

export const SYSTEM_PERMISSIONS = {
  LOGOUT: 1,
};

export const DOMAINS = {
  USER: 'user',
  ROLE: 'role',
  SYSTEM: 'system',
};
