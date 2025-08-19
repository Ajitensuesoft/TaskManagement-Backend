import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const authenticateUser:any = ClerkExpressRequireAuth();
