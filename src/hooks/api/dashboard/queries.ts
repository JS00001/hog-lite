import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { GET_DASHBOARD_KEY, GET_DASHBOARDS_KEY } from '../keys';

import {
  getMockDashboardResponse,
  getMockDashboardsResponse,
} from '@/constants/mock-data';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import { validateResponse } from '@/lib/utils';
import { getDashboard, getDashboards } from '@/api';

export const useGetDashboards = () => {
  const demoing = useAuthStore((state) => state.demoing);
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  const setField = useClientStore((state) => state.setField);
  const project = useClientStore((state) => state.project);
  const dashboard = useClientStore((state) => state.dashboard);

  const query = useQuery({
    enabled: !!project && !!isLoggedIn,
    queryKey: [GET_DASHBOARDS_KEY, project, demoing],
    queryFn: async () => {
      if (demoing) {
        const res = await getMockDashboardsResponse();
        return validateResponse(res);
      }

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
      setField('dashboard', firstDashboard.id.toString());
    }
  }, [query.data]);

  return query;
};

export const useGetDashboard = () => {
  const isLoggedIn = useAuthStore((state) => state.apiKey || state.demoing);
  const demoing = useAuthStore((state) => state.demoing);

  const project = useClientStore((state) => state.project);
  const dashboard = useClientStore((state) => state.dashboard);
  const insightsTimePeriod = useClientStore(
    (state) => state.insightsTimePeriod,
  );

  // Create a stable key for the query
  const key = [
    GET_DASHBOARD_KEY,
    project,
    dashboard,
    insightsTimePeriod,
    demoing,
  ];

  return useQuery({
    queryKey: key,
    enabled: !!project && !!dashboard && !!isLoggedIn,
    queryFn: async () => {
      if (demoing) {
        const res = await getMockDashboardResponse(insightsTimePeriod);
        return validateResponse(res);
      }

      const res = await getDashboard({
        dashboard_id: dashboard!,
        project_id: project!,
        filters_override: {
          date_from: insightsTimePeriod,
          date_to: null,
          properties: [],
          breakdown_filter: null,
        },
        variablesOverride: {},
      });
      return validateResponse(res);
    },
  });
};
