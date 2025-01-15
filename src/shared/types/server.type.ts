import { Application } from 'express';

export type ServerProps = {
  server: Application;
  db: unknown;
};
