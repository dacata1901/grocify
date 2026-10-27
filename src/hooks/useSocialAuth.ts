import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export default function useSocialAuth() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Sign-in did not complete. Please try again.",
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth:", error);
      Alert.alert(
        "Error",
        "Failed to sign in with social provider. Please try again.",
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
}
