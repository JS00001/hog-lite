import { IInsight } from '@/@types/models/insight';
import { API } from '..';

export type GetDashboardsResponse = API.Response<{
  count: number;
  results: {
    id: number;
    name: string;
    description: string;
  }[];
}>;

export type GetDashboardResponse = API.Response<{
  name: string;
  description: string;
  tiles: {
    id: number;
    insight: IInsight;
  }[];
}>;
