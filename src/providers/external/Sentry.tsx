import { PropsWithChildren } from "react";
import * as Sentry from "@sentry/react-native";

import constants from "@/constants";

export default function SentryProvider({ children }: PropsWithChildren) {
  Sentry.init({
    dsn: constants.sentryDsn,
    enabled: constants.environment === "production",
    environment: constants.environment,
  });

  return children;
}
