import { useClerk, useUser } from "@clerk/clerk-expo";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

const UserProfile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        {/* Ảnh đại diện hình tròn (size-12 = rộng 48px, cao 48px) */}
        <View className="size-12 overflow-hidden rounded-full">
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* Cột ở giữa: Tên hiển thị và Email */}
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
            Signed in as
          </Text>
          <Text className="mt-1 text-lg font-bold text-foreground">
            {displayName}
          </Text>
          <Text className="text-sm text-muted-foreground">{email}</Text>
        </View>

        {/* Nút Đăng xuất ở bên phải */}
        <Pressable
          onPress={() => signOut()}
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive"
        >
          <FontAwesome6 name="right-from-bracket" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfile;
