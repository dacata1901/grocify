import { create } from "zustand";

// 1. Khai báo các kiểu dữ liệu (TypeScript Types)
export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

// Bản thiết kế của Kho dữ liệu (gồm 3 biến trạng thái và 6 hàm hành động)
type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

// 2. Tạo Kho dữ liệu với Zustand
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  // HÀM 1: Lấy danh sách món hàng từ GET /api/items
  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      const payload = (await res.json()) as ItemsResponse;

      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      set({ items: payload.items });
    } catch (error) {
      console.error("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  // HÀM 2: Thêm món hàng mới qua POST /api/items
  addItem: async (input) => {
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      // Đưa món hàng mới (payload.item) lên ĐẦU danh sách cũ (...state.items)
      set((state) => ({ items: [payload.item, ...state.items] }));
      return payload.item;
    } catch (error) {
      console.error("Error adding item:", error);
      set({ error: "Something went wrong" });
    }
  },

  // 4 hàm còn lại tạm để trống chờ Chặng 9.2
  updateQuantity: async () => {},
  togglePurchased: async () => {},
  removeItem: async () => {},
  clearPurchased: async () => {},
}));
