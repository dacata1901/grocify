import { Image } from "expo-image";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View>
      <Text>Xin chào grocify</Text>
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 100, height: 100, borderRadius: 20 }}
      />
    </View>
  );
}
