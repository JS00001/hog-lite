import { PropsWithChildren } from "react";

import useAuthStore from "@/store/auth";

export default function AuthProvider({ children }: PropsWithChildren) {
  const hasHydrated = useAuthStore((state) => state.hydrated);

  if (!hasHydrated) {
    return null;
  }

  return children;
}
