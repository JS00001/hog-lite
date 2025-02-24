import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_USER_KEY } from "../keys";

import { getUser } from "@/api";
import useAuthStore from "@/store/auth";
import { validateResponse } from "@/lib/utils";

export const useGetUser = () => {
  const apiKey = useAuthStore((state) => state.apiKey);
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    enabled: !!apiKey,
    queryKey: [GET_USER_KEY],
    queryFn: async () => {
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
