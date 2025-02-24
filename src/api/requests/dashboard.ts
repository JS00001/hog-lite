import axios from "@/lib/axios";

import { GetDashboardsRequest, GetDashboardsResponse } from "@/@types";

/**
 * Request:     GET /api/environments/:project_id/dashboards
 * Description: Get a list of dashboards for a project
 */
export const getDashboards = async (data: GetDashboardsRequest) => {
  const limit = data.limit ? `?limit=${data.limit}` : "";
  const url = `/api/environments/${data.project_id}/dashboards${limit}`;

  const response = await axios.get<GetDashboardsResponse>(url);

  return response.data;
};
