import { PropsWithChildren } from "react";

import useAuthStore from "@/store/auth";
import { useGetUser } from "@/hooks/api/user";

export default function AuthProvider({ children }: PropsWithChildren) {
  const query = useGetUser();
  const hasHydrated = useAuthStore((state) => state.hydrated);

  if (!hasHydrated || query.isLoading) {
    return null;
  }

  return children;
}
