import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const unifiedAuthenticate = (req: any, res: Response, next: NextFunction) => {
  console.log('Cookies:', req.cookies);
  console.log('Auth from Clerk:', req.auth);

  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'AJIT') as { id: string };
      req.userId = decoded.id;
      console.log('Authenticated via JWT, userId:', req.userId);
      return next();
    } catch (err) {
      console.warn('JWT invalid or expired:', err);
    }
  }

  if (req.auth?.clerkUserId) {
    req.userId = req.auth.clerkUserId;
    console.log('Authenticated via Clerk, userId:', req.userId);
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized: No valid token or user ID found' });
};

