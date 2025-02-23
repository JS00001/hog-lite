import { AxiosError } from "axios";

import axios from ".";

import useAuthStore from "@/store/auth";
import { httpLogger } from "@/lib/logger";

/**
 * Setup request and response interceptors for axios
 * to handle common errors and refresh tokens
 */
const setupRequestInterceptors = () => {
  /**
   * Request interceptor
   */
  axios.interceptors.request.use(async (config) => {
    const apiKey = useAuthStore.getState().apiKey;

    httpLogger.debug(config.method?.toUpperCase(), config.url);

    if (apiKey && !config.headers.Authorization) {
      config.headers["Authorization"] = `Bearer ${apiKey}`;
    }

    return config;
  });

  /**
   * Response interceptor
   */
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // TODO: Handle posthog's actual errors
      // /**
      //  * If we *successfully* handle a common error, we want to return the
      //  * response. This is so we dont have to use catch blocks in every
      //  * API call. Instead, we can add a check for errors:
      //  */
      // const errorHandledResponse = {
      //   data: responseData,
      // };

      // /** 401 - EXPIRED_TOKEN */
      // if (errorDetails.message === "EXPIRED_TOKEN") {
      //   return handleExpiredTokenResponse(originalRequest, error);
      // }

      // /** 401 - UNAUTHORIZED */
      // if (errorDetails.message === "UNAUTHORIZED") {
      //   useAuthStore.getState().logout();
      //   return Promise.resolve(errorHandledResponse);
      // }

      return Promise.reject(error);
    }
  );
};

export default setupRequestInterceptors;
