import Constants from 'expo-constants';

import Package from '@/../package.json';

export type Environment = 'development' | 'production';

export default {
  /**
   * The version and update version of the app
   */
  version: `${Package.version} - ${Package.updateVersion}`,
  /**
   * The public PostHog API key
   */
  posthogPublicApiKey: Constants.expoConfig?.extra?.posthog?.apiKey,
  /**
   * The PostHog API Host
   */
  posthogHost: Constants.expoConfig?.extra?.posthog?.url,
  /**
   * The Sentry DSN (Data Source Name)
   */
  sentryDsn: Constants.expoConfig?.extra?.sentry?.dsn,
  /**
   * The environment the app is running in
   */
  environment: __DEV__ ? 'development' : 'production',
  /**
   * The URL for the github repository
   */
  githubUrl: 'https://github.com/JS00001/hog-lite',
  /**
   * The URL for the app store listing
   */
  appStoreUrl: 'https://apps.apple.com/us/app/hoglite/id6742509573',
};
