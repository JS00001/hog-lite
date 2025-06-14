import axios from '@/lib/axios';
import { GetLiveStatsResponse } from '@/@types';

/**
 * Request:     GET /stats
 * Description: Get live statistics for the product
 */
export const getLiveStats = async () => {
  const url = `/stats`;

  const response = await axios.get<GetLiveStatsResponse>(url);

  return response.data;
};
