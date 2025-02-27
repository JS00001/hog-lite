import { PropsWithChildren, useRef } from "react";

import useAuthStore from "@/store/auth";
import { useGetUser } from "@/hooks/api/user";

export default function AuthProvider({ children }: PropsWithChildren) {
  const initialized = useRef(false);

  const query = useGetUser();
  const hasHydrated = useAuthStore((state) => state.hydrated);

  /**
   * On the first app load, we want to fetch this query if needed (if the user is loggedin)
   * then, we dont want to return null when fetching again
   * so we keep track of it already being initialized
   */
  if ((!hasHydrated || query.isLoading) && !initialized.current) {
    initialized.current = true;
    return null;
  }

  return children;
}
