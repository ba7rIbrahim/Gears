import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { magicLink } from "better-auth/plugins";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();

const db = client.db("test");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  email: {
    sendVerification: true,
    sendPasswordReset: true,
  },
  // Allow both local dev and production frontend origins
  trustedOrigins: [
    "http://localhost:5173",
    "https://geeaers.vercel.app",
    process.env.FRONTEND_URL as string,
  ].filter(Boolean) as string[],
  baseURL: process.env.BACKEND_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {},
    }),
  ],
});
