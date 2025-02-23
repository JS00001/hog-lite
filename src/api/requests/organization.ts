import axios from "@/lib/axios";

import { GetOrganizationRequest, GetOrganizationResponse } from "@/@types";

/**
 * Request:     GET /api/organizations/:id
 * Description: Get a users organization
 */
export const getOrganization = async (data: GetOrganizationRequest) => {
  const url = `/organizations/${data.id}`;

  const response = await axios.get<GetOrganizationResponse>(url);

  return response.data;
};
