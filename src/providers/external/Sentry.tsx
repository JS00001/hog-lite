import Constants from "expo-constants";
import { PropsWithChildren } from "react";
import * as Sentry from "@sentry/react-native";

export default function SentryProvider({ children }: PropsWithChildren) {
  Sentry.init({
    dsn: Constants.expoConfig?.extra?.sentry?.dsn,
    enabled: !__DEV__,
    environment: __DEV__ ? "dev" : "prod",
  });

  return children;
}
