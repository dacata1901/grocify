import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SentryFeedbackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        zIndex: 50,
        bottom: insets.bottom + 90,
      }}
    >
      <Pressable
        onPress={() => Sentry.showFeedbackWidget()}
        className="flex-row items-center gap-2 rounded-full border border-border bg-card px-4 py-3"
      >
        <FontAwesome6 name="comment-dots" size={14} color="#57b983" />
        <Text className="text-sm font-semibold text-foreground">Feedback</Text>
      </Pressable>
    </View>
  );
};

export default SentryFeedbackButton;
