import { z } from "zod";

// prettier-ignore
const validators = {
  /**
   * Posthog API Key
   */
  posthogApiKey: z
    .string({
      required_error: 'API Key is required',
      invalid_type_error: 'Must be a string',
    })
    .regex(/phx_[a-zA-Z0-9]{5,}/, {
      message: 'Invalid API Key',
    }),
};

export default validators;
