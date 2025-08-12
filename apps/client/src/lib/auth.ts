import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://gears-backend.onrender.com",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
