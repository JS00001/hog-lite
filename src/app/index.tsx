import { Redirect } from "expo-router";

import useAuthStore from "@/store/auth";

export default function Index() {
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  if (!loggedIn) {
    return <Redirect href="/onboarding/landing" />;
  }

  return <Redirect href="/main/insights" />;
}
