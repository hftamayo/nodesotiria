import { startBE } from './config/startBackend';

startBE()
  .then(() => {
    console.log('Sotiria backend is up and running');
  })
  .catch((error: unknown) => {
    console.error('Error starting sotiria backend: ', error);
    process.exit(1);
  });
