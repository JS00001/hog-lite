import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_USER_KEY } from "../keys";

import { getUser } from "@/api";
import useAuthStore from "@/store/auth";
import { validateResponse } from "@/lib/utils";
import { getMockUserResponse } from "@/constants/mock-data";

export const useGetUser = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const setUser = useAuthStore((state) => state.setUser);
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const query = useQuery({
    enabled: !!loggedIn,
    queryKey: [GET_USER_KEY],
    queryFn: async () => {
      if (demoing) {
        const res = await getMockUserResponse();
        return validateResponse(res);
      }

      const res = await getUser();
      return validateResponse(res);
    },
  });

  // When the query data changes, update the auth store for 'global' access
  useEffect(() => {
    if (query.data) setUser(query.data);
  }, [query.data]);

  return query;
};
