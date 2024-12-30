import express, { Request, Response } from 'express';
import { currentUser } from '@matickets12/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    console.log('current user from Backend: ', req.currentUser);
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
