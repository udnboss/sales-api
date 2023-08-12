import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from './api/base';

//TODO: should be on an external central provider. e.g. redis/memcached server
export const VALID_REFRESH_TOKENS:string[] = [];

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const API_SECRET_KEY = process.env.API_SECRET_KEY || 'your_secret_key';

export const authenticate = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(' ')[1];
  token = token || req.cookies['x-access-token'];
  if (!token) {
    return res.status(401).send('Access token required in either 1. header authorization: bearer <token> 2. cookie x-access-token');
  }

  try {
    jwt.verify(token, API_SECRET_KEY);
    next();
  } catch (err) {
    let refreshToken = req.cookies['x-refresh-token'];
    if (refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, API_SECRET_KEY);

        //TODO: check if it is not invalidated manually
        if (!VALID_REFRESH_TOKENS.includes(refreshToken)) { 
          return res.status(403).send('Invalid or expired access and refresh token: Revoked');
        }
        //renew access token if refresh token is valid
        const accessToken = jwt.sign(payload, API_SECRET_KEY, { expiresIn: '15m' });
        res.cookie('x-access-token', accessToken, { httpOnly: true, secure: false });
        res.header('x-access-token', accessToken);
        next();
      } catch (err2) {
        return res.status(403).send('Invalid or expired access and refresh token: ' + err);
      }
    }
    return res.status(403).send('Invalid access token: ' + err);
  }
};

export const setCSRFToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.csrfToken();
  res.cookie('x-csrf-token', token);
  res.set('x-csrf-token', token);
  next();
};



