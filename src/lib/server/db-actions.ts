import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";

// 1. QUERY: Lấy toàn bộ danh sách món hàng (xếp món mới nhất lên đầu)
export const listGroceryItems = async () => {
  const rows = await db
    .select()
    .from(groceryItems)
    .orderBy(desc(groceryItems.updated_at));

  return rows;
};

// 2. MUTATION: Thêm 1 món hàng mới vào bảng
export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning();

  return rows[0];
};

// 3. MUTATION: Đánh dấu món hàng là Đã mua (true) hoặc Chưa mua (false)
export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean,
) => {
  const rows = await db
    .update(groceryItems)
    .set({ purchased, updated_at: Date.now() })
    .where(eq(groceryItems.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

// 4. MUTATION: Tăng hoặc giảm số lượng của 1 món hàng
export const updateGroceryItemQuantity = async (
  id: string,
  quantity: number,
) => {
  const rows = await db
    .update(groceryItems)
    .set({
      quantity: Math.max(1, Math.floor(quantity)),
      updated_at: Date.now(),
    })
    .where(eq(groceryItems.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

// 5. MUTATION: Xóa 1 món hàng theo mã id
export const deleteGroceryItem = async (id: string) => {
  await db.delete(groceryItems).where(eq(groceryItems.id, id));
};

// 6. MUTATION: Xóa TẤT CẢ các món hàng đã mua xong (purchased === true)
export const clearPurchasedItems = async () => {
  await db.delete(groceryItems).where(eq(groceryItems.purchased, true));
};
