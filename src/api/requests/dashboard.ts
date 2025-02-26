import qs from "qs";

import axios from "@/lib/axios";

import {
  GetDashboardRequest,
  GetDashboardResponse,
  GetDashboardsRequest,
  GetDashboardsResponse,
} from "@/@types";

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

/**
 * Request:     GET /api/environments/:project_id/dashboards/:dashboard_id
 * Description: Get a dashboard by id
 */
export const getDashboard = async (data: GetDashboardRequest) => {
  const queryString = qs.stringify({
    filters_override: JSON.stringify(data.filters_override),
    refresh: "blocking",
  });

  const url = `/api/environments/${data.project_id}/dashboards/${data.dashboard_id}?${queryString}`;

  const response = await axios.get<GetDashboardResponse>(url);

  return response.data;
};
