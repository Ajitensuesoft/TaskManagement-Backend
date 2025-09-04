"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchClerkUser = fetchClerkUser;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function fetchClerkUser(userId) {
    const clerkApiKey = process.env.CLERK_SECRET_KEY;
    const url = `https://api.clerk.com/v1/users/${userId}`;
    console.log(" Fetching Clerk user from:", url);
    const response = await axios_1.default.get(url, {
        headers: {
            Authorization: `Bearer ${clerkApiKey}`,
        },
    });
    console.log(" Clerk user fetched:", response.data);
    return response.data;
}
// import { clerkClient } from '@clerk/clerk-sdk-node';
// export const fetchClerkUser = async (clerkUserId: string) => {
//   try {
//     const user = await clerkClient.users.getUser(clerkUserId);
//     return user;
//   } catch (err) {
//     console.error(`Error fetching user with ID ${clerkUserId} from Clerk:`, err);
//     throw err;
//   }
// };
