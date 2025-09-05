import express, { Request, Response, NextFunction } from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userTo from "./models/usermodel";
import { fetchClerkUser } from "./utils/fetchClerkUser";
import routes from "./routes/todo.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import authroutes from "./routes/auth.routes";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import "./taskRemainder";
import webpush from "web-push";
import { acceptInvitation } from "./controllers/InvitingController";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

/**
 * ✅ Allowed origins for CORS
 * - localhost (for dev)
 * - Vercel deployments (ruddy + six)
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmanagment-frontend-six.vercel.app",
  "https://taskmanagment-frontend-ruddy.vercel.app",
];

const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmanagment-frontend-six.vercel.app",
  "https://taskmanagment-frontend-ruddy.vercel.app", // ✅ add this
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS blocked request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ✅ Basic test route
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

// ✅ Invitation route
app.post("/invite/accept/:invitationToken", acceptInvitation);

app.use(cookieParser());
app.use(express.json());

// ✅ Clerk webhook
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers as Record<string, string>;

      const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
      const event: any = webhook.verify(payloadString, svixHeaders);

      console.log("📨 Webhook Event:", event);

      const { id } = event.data;
      const eventType = event.type;

      const fullUser: any = await fetchClerkUser(id);
      console.log("👤 Clerk User:", JSON.stringify(fullUser, null, 2));

      const userData = {
        clerkUserId: fullUser.id,
        firstName: fullUser.first_name || "",
        lastName: fullUser.last_name || "",
        email: fullUser.email_addresses?.[0]?.email_address || "",
        imageUrl: fullUser.image_url || "",
        role: "clerk",
      };

      if (eventType === "user.created" || eventType === "user.updated") {
        await userTo.findOneAndUpdate(
          { clerkUserId: fullUser.id },
          userData,
          { upsert: true, new: true }
        );
        console.log(`${eventType} - User saved/updated`);
      } else if (eventType === "user.deleted") {
        await userTo.findOneAndDelete({ clerkUserId: fullUser.id });
        console.log(`${eventType} - User deleted`);
      } else {
        console.log(`Unhandled event type: ${eventType}`);
      }

      res.status(200).json({ success: true, message: `Processed ${eventType}` });
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

// ✅ API routes
app.use("/api/v1", routes);
app.use("/api/auth", authroutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
