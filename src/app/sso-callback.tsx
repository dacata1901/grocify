import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function SSOCallbackScreen() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Redirect href={"/(auth)/sign-in"} />;
}
