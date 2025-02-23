import useAuthStore from "@/store/auth";
import Button from "@/ui/Button";
import SafeAreaView from "@/ui/SafeAreaView";

interface Props {}

export default function Settings({}: Props) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView className="p-6">
      <Button color="danger" onPress={logout}>
        Logout
      </Button>
    </SafeAreaView>
  );
}
