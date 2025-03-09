export interface GetEventDefinitionsRequest {
  project_id?: string;
  event_type: 'event';
  exclude_hidden: boolean;
  limit: number;
  offset: number;
}
