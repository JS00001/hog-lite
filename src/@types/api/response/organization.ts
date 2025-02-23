import { API, IOrganization, IProject } from "@/@types";

export type GetOrganizationResponse = API.Response<
  IOrganization & { projects: IProject[] }
>;
