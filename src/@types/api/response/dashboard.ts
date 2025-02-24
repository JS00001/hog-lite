export interface GetDashboardsResponse {
  count: number;
  results: {
    id: number;
    name: string;
    description: string;
  }[];
}
