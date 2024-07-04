import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtAPIConstants } from '../common/Enums';

dotenv.config();
const config = process.env;

const generateJWTToken = (userId: string, email: string): string => {
  const tokenKey = process.env.TOKEN_KEY;
  if (!tokenKey) {
    throw new Error('TOKEN_KEY is not defined in the environment variables');
  }

  return jwt.sign({ userId, email }, tokenKey, {
    expiresIn: '4h',
    issuer: JwtAPIConstants.ShareFairAPI,
    audience: JwtAPIConstants.ShareFairAPI,
  });
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Return Unauthorized response
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_KEY as string, (err, user?: string | jwt.JwtPayload) => {
    // Return Forbidden response
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

export { generateJWTToken, authenticateToken };
