import { useMutation } from "@tanstack/react-query";

import { login } from "@/api";
import useAuthStore from "@/store/auth";
import { LoginRequest } from "@/@types";
import useClientStore from "@/store/client";
import { validateResponse } from "@/lib/utils";
import { router } from "expo-router";

export const useLogin = () => {
  const authStore = useAuthStore();
  const clientStore = useClientStore();

  const query = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await login(data);
      return validateResponse(res);
    },
    onSuccess: (data, vars) => {
      if (data.organization.id) {
        clientStore.setField("organization", data.organization.id);
      }

      if (data.organization.projects.length) {
        const project = data.organization.projects[0];
        clientStore.setField("project", project.id.toString());
      }

      authStore.login(vars.apiKey);
      router.push("/main/insights");
    },
  });

  return query;
};
