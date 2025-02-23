import axios from "@/lib/axios";
import { GetUserResponse } from "@/@types";

/**
 * Request:     POST /api/v1/auth/apple
 * Description: Get the user who owns the access token
 */
export const getUser = async () => {
  const url = `/users/@me`;

  const response = await axios.get<GetUserResponse>(url);

  return response.data;
};
