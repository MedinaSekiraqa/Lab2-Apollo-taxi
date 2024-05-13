import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  // Return session and loading status
  return session || status === "loading";
}
