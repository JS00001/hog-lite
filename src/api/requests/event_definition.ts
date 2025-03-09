import qs from 'qs';

import axios from '@/lib/axios';

import {
  GetEventDefinitionsRequest,
  GetEventDefinitionsResponse,
} from '@/@types';

/**
 * Request:     GET /api/projects/:project_id/event_definitions
 * Description: Get a list of event definitions for a project
 */
export const getEventDefinitions = async (data: GetEventDefinitionsRequest) => {
  const project_id = data.project_id;

  delete data.project_id;

  const queryString = qs.stringify(data);

  const url = `/api/projects/${project_id}/event_definitions?${queryString}`;

  const response = await axios.get<GetEventDefinitionsResponse>(url);

  return response.data;
};
