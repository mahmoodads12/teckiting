import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationRequest, BadRequestError } from '@matickets12/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ],
  validationRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // new user({email, password})
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError('Email in use');
      }

      const user = User.build({ email, password });
      await user.save(); // save them in database

      // Gererate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };
      console.log('user from signup:', user);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }
);

export { router as signupRouter };
