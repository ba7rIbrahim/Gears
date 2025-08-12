import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();

const db = client.db("test");

export const auth = betterAuth({
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      
    }
  },
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  email: {
    sendVerification: true,
    sendPasswordReset: true,
  },
  trustedOrigins: ["https://geeaers.vercel.app"],
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
