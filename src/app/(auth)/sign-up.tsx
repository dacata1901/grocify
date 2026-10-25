import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Bước 1: Khi người dùng nhập Email + Mật khẩu và bấm Continue
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Yêu cầu Clerk gửi mã xác nhận 6 số về hộp thư Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Chuyển màn hình sang ô nhập mã 6 số
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Bước 2: Khi người dùng nhập mã 6 số từ Email và bấm Verify
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Nếu đang chờ nhập mã xác nhận Email thì hiện giao diện nhập mã
  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center bg-white p-6">
        <Text className="mb-4 text-2xl font-bold text-black">
          Verify your email
        </Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          className="mb-4 rounded-lg border border-gray-300 p-3 text-base text-black"
        />
        <Pressable
          onPress={onVerifyPress}
          className="items-center rounded-lg bg-blue-600 p-3"
        >
          <Text className="font-semibold text-white">Verify</Text>
        </Pressable>
      </View>
    );
  }

  // Mặc định hiện form điền Email & Mật khẩu
  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Text className="mb-6 text-2xl font-bold text-black">Sign up</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(email) => setEmailAddress(email)}
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
        onPress={onSignUpPress}
        className="items-center rounded-lg bg-blue-600 p-3"
      >
        <Text className="font-semibold text-white">Continue</Text>
      </Pressable>
      <View className="mt-4 flex-row justify-center gap-1">
        <Text className="text-gray-600">Already have an account?</Text>
        <Link href="/sign-in">
          <Text className="font-semibold text-blue-600">Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
