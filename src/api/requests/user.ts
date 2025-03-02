import axios from '@/lib/axios';
import { GetUserResponse, LoginRequest } from '@/@types';

/**
 * Request:     GET /api/users/@me
 * Description: Get the user who owns the access token
 */
export const getUser = async () => {
  const url = `/api/users/@me`;

  const response = await axios.get<GetUserResponse>(url);

  return response.data;
};

/**
 * Request:     GET /api/users/@me
 * Description: Get the user who owns the access token
 */
export const login = async (data: LoginRequest) => {
  const url = `/api/users/@me`;

  const response = await axios.get<GetUserResponse>(url, {
    headers: {
      Authorization: `Bearer ${data.apiKey}`,
    },
  });

  return response.data;
};
