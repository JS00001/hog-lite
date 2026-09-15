import { useMemo } from 'react';

import TextInput from '@/ui/TextInput';
import useAuthStore from '@/store/auth';
import Layout from '@/components/Layout';
import { t } from '@/i18n';

export default function Account() {
  const user = useAuthStore((store) => store.user)!;
  const apiKey = useAuthStore((store) => store.apiKey);

  /**
   * The users api key, masked for security. Only show the first 12 characters, then
   * fill the rest with *'s to hide the rest of the key.
   */
  const maskedApiKey = useMemo(() => {
    if (!apiKey) return t('demoMode');
    return `${apiKey.slice(0, 12)}${'*'.repeat(apiKey.length - 12)}`;
  }, [apiKey]);

  return (
    <Layout title={t('yourAccount')} className="pb-32" scrollable hasBackButton>
      <TextInput disabled label={t('apiKey')} placeholder={maskedApiKey} />
      <TextInput disabled label={t('email')} placeholder={user.email} />
      <TextInput
        disabled
        label={t('firstName')}
        placeholder={user.first_name}
      />
      <TextInput disabled label={t('lastName')} placeholder={user.last_name} />
    </Layout>
  );
}
