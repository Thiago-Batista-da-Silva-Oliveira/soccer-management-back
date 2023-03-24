import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
  data: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: 'token invalid',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const verifyToken = verify(token,'6468468468') as IPayload;
    req.userId = verifyToken.sub;
    return next();
  } catch (err) {
    return res.status(401).json({ errorCode: 'token expired' });
  }
}
