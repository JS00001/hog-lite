import { IOrganization, IProject } from '..';

export interface IUser {
  date_joined: string;
  uuid: string;
  distinct_id: string;
  first_name: string;
  last_name: string;
  email: string;
  organizations: IOrganization[];
  organization: IOrganization & {
    projects: IProject[];
  };
}
