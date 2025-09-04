import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY || "fallback-secret-key";

export const verifyInvitationToken = (
  token: string
): { workspaceId: string; email: string } => {
  return jwt.verify(token, JWT_SECRET as jwt.Secret) as {
    workspaceId: string;
    email: string;
  };
};