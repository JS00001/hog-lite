import { PropsWithChildren } from "react";
import { PostHogProvider } from "posthog-react-native";

import constants from "@/constants";

export default function PosthogProvider({ children }: PropsWithChildren) {
  if (constants.environment === "development") return children;

  return (
    <PostHogProvider
      apiKey={constants.posthogPublicApiKey}
      autocapture={{
        captureLifecycleEvents: false,
        captureTouches: false,
        captureScreens: true,
      }}
      options={{
        host: constants.posthogHost,
      }}
    >
      {children}
    </PostHogProvider>
  );
}
