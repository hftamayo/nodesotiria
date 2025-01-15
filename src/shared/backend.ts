import { StartBackend } from './config/enviro.js';

StartBackend()
  .then(({ server, db }) => {
    console.log('Backend started');
    console.log('Server:', server);
    console.log('Database:', db);
  })
  .catch((err: unknown) => {
    console.error('Failed to start backend', err);
    process.exit(1);
  });
