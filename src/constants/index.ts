import Constants from "expo-constants";

import Package from "@/../package.json";

export type Environment = "development" | "production";

export default {
  /**
   * The version and update version of the app
   */
  version: `${Package.version} - ${Package.updateVersion}`,
  /**
   * The public PostHog API key
   */
  posthogPublicApiKey: Constants.expoConfig?.extra?.posthog?.publicApiKey,
  /**
   * The PostHog API Host
   */
  posthogHost: Constants.expoConfig?.extra?.posthog?.host,
  /**
   * The Sentry DSN (Data Source Name)
   */
  sentryDsn: Constants.expoConfig?.extra?.sentry?.dsn,
  /**
   * The environment the app is running in
   */
  environment: __DEV__ ? "development" : "production",
};
