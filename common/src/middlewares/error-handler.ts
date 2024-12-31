import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler: Response | Error | any = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Fehlerbehandlung für RequestValidationError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    console.error('error from error-handler.ts : ', err);
    // Allgemeine Fehlerbehandlung
    res.status(400).send({
      errors: [{ message: 'Something went wrong!' }],
    });
  }
};
