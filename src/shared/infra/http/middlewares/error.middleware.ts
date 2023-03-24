import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Erro interno do servidor.`,
  });
}
