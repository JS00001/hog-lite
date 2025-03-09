import { useQuery } from '@tanstack/react-query';

import { GET_EVENT_DEFINITIONS_KEY } from '../keys';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import { validateResponse } from '@/lib/utils';
import { GetEventDefinitionsRequest } from '@/@types';
import { getEventDefinitions } from '@/api/requests/event_definition';
import { getMockEventDefinitionsResponse } from '@/constants/mock-data';

// TODO: Paginate this/allow for pagination, right now, this is fine for my use case
export const useGetEventDefinitions = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const project = useClientStore((state) => state.project);
  const setField = useClientStore((state) => state.setField);
  const eventFilter = useClientStore((state) => state.activityEventDefinition);

  // Craft the payload that we will send to the server
  const payload: GetEventDefinitionsRequest = {
    project_id: project!,
    event_type: 'event',
    exclude_hidden: true,
    limit: 250,
  };

  // Derive some stable query keys so we refetch when critical data changes
  const queryKey = [GET_EVENT_DEFINITIONS_KEY, project, demoing];

  const query = useQuery({
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    queryKey: queryKey,
    queryFn: async () => {
      let data;

      // Either set the response to the mocked data or the actual data
      if (demoing) {
        const res = await getMockEventDefinitionsResponse();
        data = validateResponse(res);
      } else {
        const res = await getEventDefinitions({
          ...payload,
        });

        data = validateResponse(res);
      }

      // We want to check if our currently selected event is in the current project, if not
      // we want to reset it
      const eventInProject = data.results.find((d) => {
        return d.name === eventFilter;
      });

      if (!eventInProject) {
        setField('activityEventDefinition', 'all');
      }

      return data;
    },
  });

  return query;
};
