import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_ORGANIZATION_KEY } from "../keys";

import { getOrganization } from "@/api";
import useClientStore from "@/store/client";
import { validateResponse } from "@/lib/utils";

export const useGetOrganization = () => {
  const clientStore = useClientStore();

  const id = clientStore.organization;

  const query = useQuery({
    enabled: !!id,
    queryKey: [GET_ORGANIZATION_KEY, id],
    queryFn: async () => {
      const res = await getOrganization({ id: id! });
      return validateResponse(res);
    },
  });

  // When we swap organizations, we want to set the project to be the one from the
  // new organization.
  useEffect(() => {
    const project = query.data?.projects[0];

    if (project) {
      clientStore.setField("project", project.id.toString());
    }
  }, [query.data]);

  return query;
};
