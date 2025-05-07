import express from 'express';

const roleRouter = express.Router();

roleRouter.get('/app');
roleRouter.get('/db');

export default roleRouter;
