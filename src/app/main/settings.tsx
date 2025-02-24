import { useMemo } from "react";

import Button from "@/ui/Button";
import Select from "@/ui/Select";
import alert from "@/lib/alert";
import TextInput from "@/ui/TextInput";
import useAuthStore from "@/store/auth";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import { ISelectOption } from "@/ui/Select/@types";
import { useGetOrganization } from "@/hooks/api/organization";

export default function Settings() {
  const organizationQuery = useGetOrganization();

  const authStore = useAuthStore();
  const clientStore = useClientStore();

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
    const apiKey = authStore.apiKey!;
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
  };

  return (
    <Layout title="Settings" scrollable>
      {/* Selections */}
      <Select
        size="sm"
        label="Project"
        placeholder="Select project"
        value={clientStore.project}
        options={projectSelectOptions}
        disabled={organizationQuery.isLoading}
        onChange={(value) => clientStore.setField("project", value)}
      />
      <Select
        size="sm"
        label="Organization"
        placeholder="Select organization"
        value={clientStore.organization}
        options={organizationSelectOptions}
        loading={organizationQuery.isLoading}
        onChange={(value) => clientStore.setField("organization", value)}
      />
      <Select
        size="sm"
        label="Theme"
        placeholder="Select theme"
        value={clientStore.theme}
        options={themeSelectOptions}
        onChange={(value) => {
          clientStore.setField("theme", value as "light" | "dark");
        }}
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
