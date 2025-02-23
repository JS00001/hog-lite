import { useInfiniteQuery } from "@tanstack/react-query";

import { GET_QUERY_KEY } from "../keys";

import { getQuery } from "@/api";
import { createUUID } from "@/lib/utils";
import useClientStore from "@/store/client";
import { GetQueryRequest } from "@/@types";

export const useGetEvents = () => {
  const PAGINIATION_LIMIT = 100;

  const clientStore = useClientStore();

  // Craft the payload that we will send to the server
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

  const query = useInfiniteQuery({
    staleTime: Infinity,
    initialPageParam: 0,
    queryKey: queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      // Generate a unique query id for each request, add the pagination
      // updates, then query
      const res = await getQuery({
        ...payload,
        client_query_id: createUUID(),
        query: {
          ...payload.query,
          limit: PAGINIATION_LIMIT,
          offset: pageParam * PAGINIATION_LIMIT,
        },
      });

      return res;
    },
    // If we have more pages to fetch, return the next offset
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.offset + 1;
      }
    },
  });

  // Combine all of the results into one flat array
  const pages = query.data?.pages || [];
  const results = pages.flatMap((page) => page.results);

  return {
    ...query,
    data: {
      ...query.data,
      results,
    },
  };
};
