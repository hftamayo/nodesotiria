import express from 'express';

const userRouter = express.Router();

userRouter.get('/app');
userRouter.get('/db');

export default userRouter;
