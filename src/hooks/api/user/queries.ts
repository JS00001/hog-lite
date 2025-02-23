import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_USER_KEY } from "../keys";

import { getUser } from "@/api";
import useAuthStore from "@/store/auth";

export const useGetUser = () => {
  const authStore = useAuthStore();

  const query = useQuery({
    enabled: !!authStore.apiKey,
    queryKey: [GET_USER_KEY],
    queryFn: async () => {
      const res = await getUser();
      return res;
    },
  });

  // When the query data changes, update the auth store for 'global' access
  useEffect(() => {
    if (query.data) authStore.setUser(query.data);
  }, [query.data]);

  return query;
};
