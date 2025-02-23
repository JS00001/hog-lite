import Button from "@/ui/Button";
import SafeAreaView from "@/ui/SafeAreaView";
import { Text, TextInput, View } from "react-native";

interface Props {}

export default function Step1({}: Props) {
  return (
    <SafeAreaView className="px-6 flex-1 justify-center">
      <View className="bg-divider-light pb-1 rounded-xl overflow-hidden">
        <View className="bg-white rounded-xl p-4 gap-4">
          <Text className="text-center text-2xl font-semibold text-ink-light">
            API Key
          </Text>

          <View className="gap-1">
            <Text className="font-medium text-ink-light">API Key</Text>

            <TextInput
              placeholder="phx_12345"
              className="p-3 border border-divider-light rounded-lg"
            />
          </View>

          <Button size="lg" color="accent">
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
