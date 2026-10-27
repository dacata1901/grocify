import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();

  // Lọc lấy riêng những món đã mua (purchased === true)
  const completedItems = items.filter((item) => item.purchased);

  // Nếu chưa có món nào được mua (độ dài bằng 0) thì ẩn luôn khu vực này
  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            {/* Nút tròn màu xanh có dấu tích V: Bấm vào để bỏ chọn (đưa lại lên danh sách cần mua) */}
            <Pressable
              onPress={() => togglePurchased(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>

            {/* Tên món hàng có gạch ngang giữa chữ (line-through) */}
            <Text className="text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>

          {/* Nút xóa món hàng */}
          <Pressable
            onPress={() => removeItem(item.id)}
            className="h-8 w-8 items-center justify-center rounded-xl bg-destructive"
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default CompletedItems;
