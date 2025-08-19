// // middlewares/attachUserId.ts
import { Request, Response, NextFunction } from 'express';

export const attachUserId = (req: Request, res: Response, next: NextFunction) => {
  // Grab Clerk user ID from the request (set by ClerkExpressWithAuth)
  const clerkUserId = (req as any).auth?.clerkUserId;

  if (clerkUserId) {
    // Attach userId to request for later use
    (req as any).userId = clerkUserId;
    console.log("Clerk user ID found:", clerkUserId);
  }

  // If no user ID is found, return 401
  // if (!(req as any).userId) {
  //   console.log("No user ID found in request");
  //   return res.status(401).json({ message: 'Unauthorized: No user ID found' });
  // }

  next();
};



// middlewares/attachUserId.ts
// import { Request, Response, NextFunction } from "express";

// export const attachUserId = (req: Request, res: Response, next: NextFunction) => {
//   // Clerk sets req.auth.userId after requireAuth() runs
//   const clerkUserId = (req as any).auth?.userId; // <-- correct key

//   if (clerkUserId) {
//     (req as any).userId = clerkUserId; // attach for convenience
//     console.log("Clerk user ID found:", clerkUserId);
//     return next();
//   }

//   console.log("No user ID found in request");
//   return res.status(401).json({ message: "Unauthorized: No user ID found" });
// };
