import { useQuery } from '@tanstack/react-query';

import { GET_ORGANIZATION_KEY } from '../keys';

import { getOrganization } from '@/api';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import { validateResponse } from '@/lib/utils';
import { getMockOrganizationResponse } from '@/constants/mock-data';

export const useGetOrganization = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const project = useClientStore((state) => state.project);
  const organization = useClientStore((state) => state.organization);

  const setField = useClientStore((state) => state.setField);

  const query = useQuery({
    enabled: !!isLoggedIn,
    queryKey: [GET_ORGANIZATION_KEY, organization, demoing],
    queryFn: async () => {
      let data;

      // Either set the response to the mocked data or the actual data
      if (demoing) {
        const res = await getMockOrganizationResponse();
        data = validateResponse(res);
      } else {
        const res = await getOrganization({ id: organization! });
        data = validateResponse(res);
      }

      // When this query re-runs (e.g. when we swap organizations), we want to
      // ensure that the project field is set to the first project in the new
      // organization
      const firstProject = data.projects[0];
      const projectInOrganization = data.projects.find((p) => {
        return p.id.toString() === project;
      });

      if (firstProject && !projectInOrganization) {
        setField('project', firstProject.id.toString());
      }

      return data;
    },
  });

  return query;
};
