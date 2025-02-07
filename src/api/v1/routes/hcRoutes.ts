import express from 'express';

const hcRouter = express.Router();

hcRouter.get('/app');
hcRouter.get('/db');

export default hcRouter;
