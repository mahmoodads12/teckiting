import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}
// rebuilding current User to solve the problem req.currentUser
// we say in this session: in the Express Request we will maybe habe a UserPayload Property with name currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Session JWT:', req.session?.jwt); // Logge den JWT
  if (!req.session?.jwt) {
    console.log('Kein JWT gefunden');
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    console.log('JWT Payload:', payload); // Logge das Payload
    req.currentUser = payload;
  } catch (err) {
    console.error('Fehler beim JWT-Parsing:', err);
  }

  next();
};
