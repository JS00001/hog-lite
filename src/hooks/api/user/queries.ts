import { useQuery } from '@tanstack/react-query';

import { GET_USER_KEY } from '../keys';

import { getUser } from '@/api';
import useAuthStore from '@/store/auth';
import { validateResponse } from '@/lib/utils';
import { getMockUserResponse } from '@/constants/mock-data';

export const useGetUser = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const setUser = useAuthStore((state) => state.setUser);
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const query = useQuery({
    enabled: !!loggedIn,
    queryKey: [GET_USER_KEY],
    queryFn: async () => {
      let data;

      // Either set the response to the mocked data or the actual data
      if (demoing) {
        const res = await getMockUserResponse();
        data = validateResponse(res);
      } else {
        const res = await getUser();
        data = validateResponse(res);
      }

      // When this query re-runs, we want to ensure the user store is up to date
      setUser(data);

      return data;
    },
  });

  return query;
};
