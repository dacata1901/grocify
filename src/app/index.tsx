import { Image } from "expo-image";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-purple-500">
      <Text className="text-4x1 font-bold text-white">Xin chào grocify</Text>
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 100, height: 100, borderRadius: 20 }}
      />
    </View>
  );
}
