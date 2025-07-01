import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_QUERY_KEY } from '../keys';

import { getQuery } from '@/api';
import useAuthStore from '@/store/auth';
import { GetQueryRequest } from '@/@types';
import useClientStore from '@/store/client';
import { simpleHash, validateResponse } from '@/lib/utils';
import { QueryType } from '@/components/ActivityList/@types';
import { getMockActivityResponse } from '@/constants/mock-data';

export const useGetEvents = (type: QueryType) => {
  const PAGINIATION_LIMIT = 100;

  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const project = useClientStore((state) => state.project);
  const timePeriod = useClientStore((state) => state.activityTimePeriod);
  const eventFilter = useClientStore((state) => state.activityEventDefinition);
  const filterTestAccounts = useClientStore(
    (state) => state.filterTestAccounts,
  );

  // We need to ensure that we either pass a filter, undefined, or exception
  const event = (() => {
    if (type === QueryType.Exceptions) {
      return '$exception';
    }

    if (eventFilter === QueryType.All) {
      return undefined;
    }

    return eventFilter;
  })();

  // Craft the payload that we will send to the server
  const payload: Omit<GetQueryRequest, 'client_query_id'> = {
    project_id: project!,
    query: {
      event: event,
      after: timePeriod,
      kind: 'EventsQuery',
      orderBy: ['timestamp DESC'],
      filterTestAccounts: filterTestAccounts,
      select: [
        '*',
        'event',
        'person',
        'coalesce(properties.$current_url, properties.$screen_name) -- Url / Screen',
        'timestamp',
      ],
    },
  };

  // Derive some stable query keys so we refetch when critical data changes
  const queryKey = [
    GET_QUERY_KEY,
    project,
    timePeriod,
    filterTestAccounts,
    demoing,
    event,
  ];

  const query = useInfiniteQuery({
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    initialPageParam: 0,
    queryKey: queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      // If in demo mode, return mock data
      if (demoing) {
        const res = await getMockActivityResponse(timePeriod);
        return validateResponse(res);
      }

      // generate a unique hash for the query
      const hash = simpleHash(
        payload.project_id +
          payload.query.after +
          payload.query.filterTestAccounts +
          payload.query.event +
          pageParam,
      ).toString();

      // Generate a unique query id for each request, add the pagination
      // updates, then query
      const res = await getQuery({
        ...payload,
        client_query_id: hash,
        query: {
          ...payload.query,
          limit: PAGINIATION_LIMIT,
          offset: pageParam * PAGINIATION_LIMIT,
        },
      });

      console.log(res);

      return validateResponse(res);
    },
    // If we have more pages to fetch, return the next offset
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.offset / PAGINIATION_LIMIT + 1;
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
