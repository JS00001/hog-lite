import * as Sentry from '@sentry/react-native';

import { usePostHog as usePosthogNative } from 'posthog-react-native';

const usePosthog = () => {
  const posthog = usePosthogNative();

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    if (!posthog) {
      return;
    }

    try {
      posthog.identify(distinctId, properties);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const capture = (event: string, properties?: Record<string, any>) => {
    if (!posthog) return;

    try {
      posthog.capture(event, properties);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  return { capture, identify };
};

export default usePosthog;
