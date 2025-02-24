import axios from "@/lib/axios";
import { GetQueryRequest, GetQueryResponse } from "@/@types";

/**
 * Request:     POST /api/environments/:project_id/query
 * Description: Query the events in the project
 */
export const getQuery = async (data: GetQueryRequest) => {
  const url = `/api/environments/${data.project_id}/query`;

  // Posthog doesnt accept extra payload fields, remove our internal fields
  delete data.project_id;

  const response = await axios.post<GetQueryResponse>(url, data);

  return response.data;
};
