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
      let data;

      // Either set the response to the mocked data or the actual data
      if (demoing) {
        const res = await getMockDashboardsResponse();
        data = validateResponse(res);
      } else {
        const res = await getDashboards({ project_id: project!, limit: 2000 });
        data = validateResponse(res);
      }

      // When this query re-runs (e.g. when we swap projects), we want to
      // ensure that the dashboard field is set to the first dashboard in the
      // new project
      const firstDashboard = data.results[0];
      const dashboardInProject = data.results.find((d) => {
        return d.id.toString() === dashboard;
      });

      if (firstDashboard && !dashboardInProject) {
        setField('dashboard', firstDashboard.id.toString());
      }

      return data;
    },
  });

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
        },
      });
      return validateResponse(res);
    },
  });
};
