import { useMemo } from "react";

import Button from "@/ui/Button";
import Select from "@/ui/Select";
import alert from "@/lib/alert";
import TextInput from "@/ui/TextInput";
import useAuthStore from "@/store/auth";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import usePosthog from "@/hooks/usePosthog";
import { ISelectOption } from "@/ui/Select/@types";
import { useGetOrganization } from "@/hooks/api/organization";

export default function Settings() {
  const organizationQuery = useGetOrganization();

  const posthog = usePosthog();
  const authStore = useAuthStore();

  const setClientStore = useClientStore((s) => s.setField);
  const theme = useClientStore((store) => store.theme);
  const project = useClientStore((store) => store.project);
  const organization = useClientStore((store) => store.organization);

  const organizations = authStore.user!.organizations;
  const projects = organizationQuery.data?.projects || [];

  /**
   * All of the projects that the user can switch to, within
   * the currently selected organization.
   */
  const projectSelectOptions: ISelectOption[] = useMemo(() => {
    return projects.map((project) => ({
      label: project.name,
      value: `${project.id}`,
    }));
  }, [authStore.user, projects]);

  /**
   * All of the organizations that the user can switch to.
   */
  const organizationSelectOptions: ISelectOption[] = useMemo(() => {
    return organizations.map((organization) => ({
      label: organization.name,
      value: `${organization.id}`,
    }));
  }, [authStore.user]);

  const onProjectChange = (value: string) => {
    setClientStore("project", value);
    posthog.capture("project_changed");
  };

  const onOrganizationChange = (value: string) => {
    setClientStore("organization", value);
    posthog.capture("organization_changed");
  };

  const onThemeChange = (value: string) => {
    setClientStore("theme", value as "light" | "dark");
    posthog.capture("theme_changed", { theme: value });
  };

  /**
   * The options for the theme select input.
   */
  const themeSelectOptions: ISelectOption[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  /**
   * The users api key, masked for security. Only show the first 12 characters, then
   * fill the rest with *'s to hide the rest of the key.
   */
  const maskedApiKey = useMemo(() => {
    const apiKey = authStore.apiKey;
    if (!apiKey) return "You're in Demo Mode";
    return `${apiKey.slice(0, 12)}${"*".repeat(apiKey.length - 12)}`;
  }, [authStore.apiKey]);

  /**
   * Log the user out after prompting them with a confirmation dialog.
   */
  const onLogout = () => {
    alert({
      title: "Are you sure?",
      message:
        "Are you sure you want to logout? You will need to re-enter your API key to login again.",
      buttons: [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: authStore.logout,
        },
      ],
    });

    const eventName = authStore.demoing ? "demo_logout" : "logout";
    posthog.capture(eventName);
  };

  return (
    <Layout title="Settings" className="pb-32" scrollable>
      {/* Selections */}
      <Select
        size="sm"
        label="Project"
        placeholder="Select project"
        value={project}
        options={projectSelectOptions}
        disabled={organizationQuery.isLoading}
        onChange={onProjectChange}
      />
      <Select
        size="sm"
        label="Organization"
        placeholder="Select organization"
        value={organization}
        options={organizationSelectOptions}
        loading={organizationQuery.isLoading}
        onChange={onOrganizationChange}
      />
      <Select
        size="sm"
        label="Theme"
        placeholder="Select theme"
        value={theme}
        options={themeSelectOptions}
        onChange={onThemeChange}
      />

      {/* Form Fields */}
      <TextInput disabled label="API Key" placeholder={maskedApiKey} />
      <TextInput disabled label="Email" placeholder={authStore.user!.email} />
      <TextInput
        disabled
        label="First Name"
        placeholder={authStore.user!.first_name}
      />
      <TextInput
        disabled
        label="Last Name"
        placeholder={authStore.user!.last_name}
      />

      <Button color="danger" onPress={onLogout}>
        Logout
      </Button>
    </Layout>
  );
}
