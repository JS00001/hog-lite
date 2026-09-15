import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

import axios from '.';

import { API } from '@/@types';
import useAuthStore from '@/store/auth';
import { httpLogger } from '@/lib/logger';
import useClientStore from '@/store/client';
import { t } from '@/i18n';

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
      config.headers['Authorization'] = `Bearer ${apiKey}`;
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
      const data = error.response?.data as API.Error;

      /** No network connection */
      if (!response) {
        Toast.show({
          type: 'error',
          text1: t('networkError'),
          text2: t('networkErrorDescription'),
        });

        return Promise.reject(error);
      }

      /** 401 - Unauthorized Error */
      if (response.status === 401) {
        Toast.show({
          type: 'error',
          text1: t('authorizationFailed'),
          text2: t('authorizationFailedDescription'),
        });

        useAuthStore.getState().logout();
      }

      /** 429 - Rate Limit Exceeded */
      if (response.status === 429) {
        Toast.show({
          type: 'error',
          text1: t('rateLimitExceeded'),
          text2: t('rateLimitDescription'),
        });
      }

      /** 500 - Internal Server Error */
      if (response.status >= 500) {
        if (data.detail === 'A server error occurred.') {
          data.detail = t('posthogServerError');
        }

        Toast.show({
          type: 'error',
          text1: t('internalServerError'),
          text2: t('internalServerErrorDescription'),
        });
      }

      return Promise.reject(error);
    },
  );
};

export default setupRequestInterceptors;
