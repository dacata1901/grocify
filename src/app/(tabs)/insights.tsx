import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <Text className="text-foreground text-xl font-bold">Insights Screen</Text>
    </SafeAreaView>
  );
}
