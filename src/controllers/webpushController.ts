// src/controllers/webPushController.ts
import { Request, Response } from 'express';
import webpush from 'web-push';
import UserTo from '../models/usermodel';
import dotenv from "dotenv";
dotenv.config();
import { IPushSubscription, IUser } from '../models/usermodel';

// Set VAPID details from environment variables
webpush.setVapidDetails(
  'mailto:youremail@example.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const sendNotification = async (subscription: IPushSubscription, payload: string) => {
  try {
    await webpush.sendNotification(subscription as any, payload);
    console.log('Push notification sent successfully.');
  } catch (error: any) {
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log('Subscription expired or not found. Removing from database.');
      // In a real app, you would remove this subscription from the user model
    } else {
      console.error('Error sending push notification:', error);
    }
  }
};

export const saveSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, subscription }: { userId: string; subscription: IPushSubscription } = req.body;
    await UserTo.findByIdAndUpdate(userId, { subscription });
    res.status(200).json({ message: 'Subscription saved.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save subscription.' });
  }
};