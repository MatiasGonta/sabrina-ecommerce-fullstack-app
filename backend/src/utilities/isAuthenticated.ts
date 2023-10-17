import { NextFunction, Request, Response } from 'express';
import { decodeToken } from './token';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length) // Bearer xxxxx
    const decode = decodeToken(token);

    req.user = decode as {
      _id: string
      name: string
      email: string
      isAdmin: boolean
      token: string
    }
    next(); // Continue with next function
  } else {
    res.status(401).json({ message: 'No Token' });
  }
}