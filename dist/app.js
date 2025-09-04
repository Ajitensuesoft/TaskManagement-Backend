"use strict";
// import express, { Request, Response } from 'express';
// import { Webhook } from 'svix';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import connectDB from './config/db';
// import User from './models/user.model'; // Use the unified model
// import { fetchClerkUser } from './utils/fetchClerkUser';
// import authRoutes from "./routes/auth.routes";
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(cookieParser());
// app.use(express.json());
// // Clerk Webhook endpoint
// app.post(
//   '/api/webhook',
//   bodyParser.raw({ type: 'application/json' }),
//   async (req: Request, res: Response) => {
//     try {
//       const payloadString = req.body.toString();
//       const svixHeaders = req.headers as Record<string, string>;
//       const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
//       if (!webhookSecret) {
//         throw new Error('CLERK_WEBHOOK_SECRET_KEY is not set');
//       }
//       const webhook = new Webhook(webhookSecret);
//       const event: any = webhook.verify(payloadString, svixHeaders);
//       console.log('📨 Webhook Event:', event);
//       const { id } = event.data;
//       const eventType = event.type;
//       const fullUser:any = await fetchClerkUser(id);
//       console.log('👤 Clerk User:', JSON.stringify(fullUser, null, 2));
//       const userData = {
//         clerkUserId: fullUser.id,
//         firstName: fullUser.first_name || '',
//         lastName: fullUser.last_name || '',
//         email: fullUser.email_addresses?.[0]?.email_address || '',
//         imageUrl: fullUser.image_url || '',
//         role: 'clerk',
//       };
//       console.log("userData", userData);
//       if (eventType === 'user.created' || eventType === 'user.updated') {
//         await User.findOneAndUpdate(
//           { email: userData.email }, // Find by email for unified check
//           { ...userData, clerkUserId: fullUser.id },
//           { upsert: true, new: true, setDefaultsOnInsert: true }
//         );
//         console.log(` ${eventType} - User saved/updated`);
//       } else if (eventType === 'user.deleted') {
//         await User.findOneAndDelete({ clerkUserId: fullUser.id });
//         console.log(`${eventType} - User deleted`);
//       } else {
//         console.log(` Unhandled event type: ${eventType}`);
//       }
//       res.status(200).json({ success: true, message: `Processed ${eventType}` });
//     } catch (err: any) {
//       console.error(' Webhook error:', err.message);
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }
// );
// // Use auth routes for local users
// app.use("/api/auth", authRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
