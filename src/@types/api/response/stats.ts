import { API } from '@/@types';

export type GetLiveStatsResponse = API.Response<{
  users_on_product?: number;
}>;
