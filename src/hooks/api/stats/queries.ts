import { useQuery } from '@tanstack/react-query';

import { GET_LIVE_STATS_KEY } from '../keys';

import useAuthStore from '@/store/auth';
import { validateResponse } from '@/lib/utils';
import { getLiveStats } from '@/api/requests/stats';

export const useGetLiveStats = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const key = [GET_LIVE_STATS_KEY, demoing];

  return useQuery({
    queryKey: key,
    enabled: !!isLoggedIn,
    refetchInterval: 10000,
    queryFn: async () => {
      // if (demoing) {
      //   const res = await getMockDashboardResponse(insightsTimePeriod);
      //   return validateResponse(res);
      // }

      const res = await getLiveStats();
      return validateResponse(res);
    },
  });
};
