import Axios from "axios";

// TODO: Support multiple encironments from posthog
/**
 * You must make API requests to the correct domain. On US Cloud,
 * these are https://us.i.posthog.com for public endpoints and https://us.posthog.com for private ones.
 * On EU Cloud, these are https://eu.i.posthog.com for public endpoints and https://eu.posthog.com for
 * private ones. For self-hosted instances, use your self-hosted domain.
 * Confirm yours by checking your PostHog instance URI
 */

const axios = Axios.create({
  baseURL: `https://us.posthog.com`,
});

export default axios;
