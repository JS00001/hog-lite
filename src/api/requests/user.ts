import axios from "@/lib/axios";
import { GetUserResponse } from "@/@types";

/**
 * Request:     GET /api/users/@me
 * Description: Get the user who owns the access token
 */
export const getUser = async () => {
  const url = `/users/@me`;

  const response = await axios.get<GetUserResponse>(url);

  return response.data;
};
