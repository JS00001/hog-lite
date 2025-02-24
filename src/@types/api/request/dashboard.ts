export interface GetDashboardsRequest {
  limit?: number;
  project_id: string;
}

export interface GetDashboardRequest {
  project_id: string;
  dashboard_id: string;
}
