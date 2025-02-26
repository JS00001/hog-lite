import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_ORGANIZATION_KEY } from "../keys";

import { getOrganization } from "@/api";
import useAuthStore from "@/store/auth";
import useClientStore from "@/store/client";
import { validateResponse } from "@/lib/utils";
import { getMockOrganizationResponse } from "@/constants/mock-data";

export const useGetOrganization = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const project = useClientStore((state) => state.project);
  const organization = useClientStore((state) => state.organization);

  const setField = useClientStore((state) => state.setField);

  const query = useQuery({
    enabled: !!organization,
    queryKey: [GET_ORGANIZATION_KEY, organization, demoing],
    queryFn: async () => {
      if (demoing) {
        const res = await getMockOrganizationResponse();
        return validateResponse(res);
      }

      const res = await getOrganization({ id: organization! });
      return validateResponse(res);
    },
  });

  // When we swap organizations, we want to set the project to be the one from the
  // new organization.
  useEffect(() => {
    const firstProject = query.data?.projects[0];
    const projectInOrganization = query.data?.projects.find((p) => {
      return p.id.toString() === project;
    });

    if (firstProject && !projectInOrganization) {
      setField("project", firstProject.id.toString());
    }
  }, [query.data]);

  return query;
};
