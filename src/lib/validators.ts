import { z } from 'zod';
import { t } from '@/i18n';

const validators = {
  /**
   * Posthog API Key
   */
  get posthogApiKey() {
    return z
      .string({
        required_error: t('apiKeyRequired'),
        invalid_type_error: t('mustBeAString'),
      })
      .regex(/phx_[a-zA-Z0-9]{5,}/, {
        message: t('invalidApiKey'),
      });
  },
  /**
   * Validate a https url
   */
  get url() {
    return z
      .string({
        required_error: t('urlRequired'),
        invalid_type_error: t('mustBeAString'),
      })
      .url({
        message: t('validUrlRequired'),
      });
  },
  /**
   * Validate a string
   */
  get string() {
    return z.string({
      required_error: t('fieldRequired'),
      invalid_type_error: t('mustBeAString'),
    });
  },
};

export default validators;
