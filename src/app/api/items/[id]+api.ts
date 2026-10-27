import {
    deleteGroceryItem,
    setGroceryItemPurchased,
    updateGroceryItemQuantity,
} from "@/lib/server/db-actions";

// 1. Khi điện thoại gọi PATCH /api/items/:id -> Cập nhật số lượng HOẶC đánh dấu đã mua
export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();

    const item = body.quantity
      ? await updateGroceryItemQuantity(id, body.quantity)
      : await setGroceryItemPurchased(id, body.purchased ?? true);

    if (!item) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }

    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update item";
    return Response.json({ error: message }, { status: 500 });
  }
}

// 2. Khi điện thoại gọi DELETE /api/items/:id -> Xóa món hàng có mã id đó
export async function DELETE(_request: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItem(id);
    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item";
    return Response.json({ error: message }, { status: 500 });
  }
}
