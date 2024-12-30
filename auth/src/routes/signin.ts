import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validationRequest, BadRequestError } from '@matickets12/common';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must supply a password'),
  ],
  validationRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }
      const passwordMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials');
      }

      // Gererate JWT
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };
      if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY ist nicht definiert');
      }

      res.status(201).send(existingUser);
    } catch (err) {
      next(err);
    }
  }
);

export { router as signinRouter };
