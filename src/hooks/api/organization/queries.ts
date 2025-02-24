import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_ORGANIZATION_KEY } from "../keys";

import { getOrganization } from "@/api";
import useClientStore from "@/store/client";
import { validateResponse } from "@/lib/utils";

export const useGetOrganization = () => {
  const project = useClientStore((state) => state.project);
  const organization = useClientStore((state) => state.organization);

  const setField = useClientStore((state) => state.setField);

  const query = useQuery({
    enabled: !!organization,
    queryKey: [GET_ORGANIZATION_KEY, organization],
    queryFn: async () => {
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
