import useAuthStore from '@/store/auth';
import Redirect from '@/ui/Redirect';

export default function Index() {
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  if (!loggedIn) {
    return <Redirect href="/onboarding/landing" />;
  }

  return <Redirect href="/main/insights" />;
}
