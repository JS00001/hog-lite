import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

import axios from ".";

import useAuthStore from "@/store/auth";
import { httpLogger } from "@/lib/logger";
import useClientStore from "@/store/client";

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
    const apiUrl = useClientStore.getState().posthogEndpoint;

    config.baseURL = apiUrl;

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
      const response = error.response;
      // const data = error.response?.data as API.Error;

      /** No network connection */
      if (!response) {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Please check your internet connection and try again.",
        });

        return Promise.reject(error);
      }

      /** 401 - Unauthorized Error */
      if (response.status === 401) {
        Toast.show({
          type: "error",
          text1: "Authorization Failed",
          text2: "Invalid API key. Maybe the wrong region?",
        });

        useAuthStore.getState().logout();
      }

      /** 429 - Rate Limit Exceeded */
      if (response.status === 429) {
        Toast.show({
          type: "error",
          text1: "Rate Limit Exceeded",
          text2:
            "PostHog has rate limits in place that we cannot control. Please wait before trying again.",
        });
      }

      /** 500 - Internal Server Error */
      if (response.status >= 500) {
        Toast.show({
          type: "error",
          text1: "Internal Server Error",
          text2: "An unexpected error occurred. Please try again later.",
        });
      }

      return Promise.reject(error);
    }
  );
};

export default setupRequestInterceptors;
