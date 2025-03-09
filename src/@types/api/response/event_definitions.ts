import { API } from '..';

export type GetEventDefinitionsResponse = API.Response<{
  count: number;
  results: {
    id: string;
    name: string;
    created_at: string;
  }[];
}>;
