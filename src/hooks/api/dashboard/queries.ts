import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { GET_DASHBOARD_KEY } from "../keys";

import { getDashboards } from "@/api";
import useClientStore from "@/store/client";
import { validateResponse } from "@/lib/utils";

export const useGetDashboards = () => {
  const setField = useClientStore((state) => state.setField);
  const project = useClientStore((state) => state.project);
  const dashboard = useClientStore((state) => state.dashboard);

  const query = useQuery({
    enabled: !!project,
    queryKey: [GET_DASHBOARD_KEY, project],
    queryFn: async () => {
      const res = await getDashboards({ project_id: project!, limit: 2000 });
      return validateResponse(res);
    },
  });

  // When we swap project, we want to set the dashboard to be the one from the
  // new project
  useEffect(() => {
    const firstDashboard = query.data?.results[0];
    const dashboardInProject = query.data?.results.find((d) => {
      return d.id.toString() === dashboard;
    });

    if (firstDashboard && !dashboardInProject) {
      setField("dashboard", firstDashboard.id.toString());
    }
  }, [query.data]);

  return query;
};
