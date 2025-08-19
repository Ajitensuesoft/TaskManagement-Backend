import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function fetchClerkUser(userId: string) {
  const clerkApiKey = process.env.CLERK_SECRET_KEY!;
  const url = `https://api.clerk.com/v1/users/${userId}`; 

  console.log(" Fetching Clerk user from:", url);

  const response = await axios.get(url, {
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