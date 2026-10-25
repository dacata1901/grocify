import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Text className="mb-6 text-2xl font-bold text-black">Sign in</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        className="mb-4 rounded-lg border border-gray-300 p-3 text-base text-black"
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#666666"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        className="mb-4 rounded-lg border border-gray-300 p-3 text-base text-black"
      />
      <Pressable
        onPress={onSignInPress}
        className="items-center rounded-lg bg-blue-600 p-3"
      >
        <Text className="font-semibold text-white">Continue</Text>
      </Pressable>
      <View className="mt-4 flex-row justify-center gap-1">
        <Text className="text-gray-600">Don&apos;t have an account?</Text>
        <Link href="/sign-up">
          <Text className="font-semibold text-blue-600">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
