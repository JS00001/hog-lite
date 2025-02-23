import { Redirect } from "expo-router";

import useAuthStore from "@/store/auth";

export default function Index() {
  const apiKey = useAuthStore((state) => state.apiKey);

  if (!apiKey) {
    return <Redirect href="/onboarding/step1" />;
  }

  return <Redirect href="/main/insights" />;
}
