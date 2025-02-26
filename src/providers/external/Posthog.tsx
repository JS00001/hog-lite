import { PropsWithChildren } from "react";
import ExpoConstants from "expo-constants";
import { PostHogProvider } from "posthog-react-native";

export default function PosthogProvider({ children }: PropsWithChildren) {
  // if (__DEV__) return children;

  return (
    <PostHogProvider
      apiKey={ExpoConstants.expoConfig?.extra?.posthog?.apiKey}
      autocapture={{
        captureLifecycleEvents: false,
        captureTouches: false,
        captureScreens: true,
      }}
      options={{
        host: ExpoConstants.expoConfig?.extra?.posthog?.url,
      }}
    >
      {children}
    </PostHogProvider>
  );
}
