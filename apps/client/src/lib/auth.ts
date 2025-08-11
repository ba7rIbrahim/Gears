import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  sessionCookieName: "session",
  debug: true,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
