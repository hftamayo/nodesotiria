import { startBackend } from '../../shared/config/enviro';

startBackend()
  .then(() => {
    console.log('PG Datalayer Service started');
  })
  .catch((error: unknown) => {
    console.error('PG Datalayer Service failed to start', error);
    process.exit(1);
  });
