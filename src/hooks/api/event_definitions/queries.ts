import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_QUERY_KEY } from '../keys';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import { validateResponse } from '@/lib/utils';
import { GetEventDefinitionsRequest } from '@/@types';
import { getEventDefinitions } from '@/api/requests/event_definition';
import { getMockEventDefinitionsResponse } from '@/constants/mock-data';

export const useGetEventDefinitions = () => {
  const PAGINATION_LIMIT = 200;

  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const project = useClientStore((state) => state.project);
  const setField = useClientStore((state) => state.setField);
  const eventFilter = useClientStore((state) => state.activityEventFilter);

  // Craft the payload that we will send to the server
  const payload: Omit<GetEventDefinitionsRequest, 'offset'> = {
    project_id: project!,
    event_type: 'event',
    exclude_hidden: true,
    limit: PAGINATION_LIMIT,
  };

  // Derive some stable query keys so we refetch when critical data changes
  const queryKey = [GET_QUERY_KEY, project, demoing];

  const query = useInfiniteQuery({
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    initialPageParam: 0,
    queryKey: queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      // If in demo mode, return mock data
      if (demoing) {
        const res = await getMockEventDefinitionsResponse();
        return validateResponse(res);
      }

      const res = await getEventDefinitions({
        ...payload,
        offset: pageParam * PAGINATION_LIMIT,
      });

      return validateResponse(res);
    },
    // If we have more pages to fetch, return the next offset
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.results.length === PAGINATION_LIMIT) {
        return lastPageParam / PAGINATION_LIMIT + 1;
      }
    },
  });

  // Combine all of the results into one flat array
  const pages = query.data?.pages || [];
  const results = pages.flatMap((page) => page.results);

  // When we swap project, we want to set the event to be null
  useEffect(() => {
    const eventInProject = results.find((d) => {
      return d.name === eventFilter;
    });

    if (!eventInProject) {
      setField('activityEventFilter', null);
    }
  }, [query.data]);

  return {
    ...query,
    data: {
      ...query.data,
      results,
    },
  };
};
