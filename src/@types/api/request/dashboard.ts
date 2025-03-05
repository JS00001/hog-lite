import { TimePeriod } from './query';

export interface GetDashboardsRequest {
  limit?: number;
  project_id: string;
}

export interface GetDashboardRequest {
  project_id: string;
  dashboard_id: string;
  filters_override?: {
    date_from: TimePeriod | null;
    date_to: TimePeriod | null;
    properties: [];
    breakdown_filter: null;
  };
  variablesOverride: Record<string, string>;
}
