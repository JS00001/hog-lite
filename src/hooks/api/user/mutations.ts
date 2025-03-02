import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';

import { login } from '@/api';
import useAuthStore from '@/store/auth';
import { LoginRequest } from '@/@types';
import useClientStore from '@/store/client';
import { validateResponse } from '@/lib/utils';
import { getMockUserResponse } from '@/constants/mock-data';

export const useLogin = () => {
  const clientStore = useClientStore();
  const loginAuthStore = useAuthStore((store) => store.login);

  const query = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await login(data);
      return validateResponse(res);
    },
    onSuccess: (data, vars) => {
      if (data.organization.id) {
        clientStore.setField('organization', data.organization.id);
      }

      if (data.organization.projects.length) {
        const project = data.organization.projects[0];
        clientStore.setField('project', project.id.toString());
      }

      loginAuthStore(vars.apiKey);
      router.push('/main/insights');
    },
  });

  return query;
};

export const useDemoLogin = () => {
  const clientStore = useClientStore();
  const setDemoing = useAuthStore((store) => store.setDemoing);

  const query = useMutation({
    mutationFn: async () => {
      const res = await getMockUserResponse();
      return validateResponse(res);
    },
    onSuccess: (data) => {
      if (data.organization.id) {
        clientStore.setField('organization', data.organization.id);
      }

      if (data.organization.projects.length) {
        const project = data.organization.projects[0];
        clientStore.setField('project', project.id.toString());
      }

      setDemoing(true);
      router.push('/main/insights');
    },
  });

  return query;
};
