import { useQuery } from "@tanstack/react-query";

import { GET_QUERY_KEY } from "../keys";

import { getQuery } from "@/api";
import { createUUID } from "@/lib/utils";
import useClientStore from "@/store/client";
import { GetQueryRequest } from "@/@types";

export const useGetEvents = () => {
  const clientStore = useClientStore();

  const payload: Omit<GetQueryRequest, "client_query_id"> = {
    project_id: clientStore.project!,
    query: {
      after: clientStore.timePeriod,
      kind: "EventsQuery",
      filterTestAccounts: clientStore.filterTestAccounts,
      orderBy: ["timestamp DESC"],
      select: [
        "*",
        "event",
        "coalesce(properties.$current_url, properties.$screen_name) -- Url / Screen",
        "timestamp",
      ],
    },
  };

  // Derive some stable query keys so we refetch when critical data changes
  const queryKey = [
    GET_QUERY_KEY,
    clientStore.project,
    clientStore.timePeriod,
    clientStore.filterTestAccounts,
  ];

  const query = useQuery({
    staleTime: Infinity,
    enabled: true,
    queryKey: queryKey,
    queryFn: async () => {
      // Generate a unique query id for each request
      const finalPayload: GetQueryRequest = {
        ...payload,
        client_query_id: createUUID(),
      };

      const res = await getQuery(finalPayload);
      if ("error" in res) throw res;
      return res;
    },
  });

  return query;
};
