import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <SignedIn>
        <Text className="mb-4 text-lg font-medium text-black">
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Pressable
          onPress={() => signOut()}
          className="rounded-lg bg-red-500 px-5 py-2.5"
        >
          <Text className="font-semibold text-white">Sign out</Text>
        </Pressable>
      </SignedIn>

      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text className="text-blue-600">Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text className="text-blue-600">Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
