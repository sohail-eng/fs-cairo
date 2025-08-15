import { NextResponse } from "next/server";
import { AppProductController } from "@/controllers";

const productController = AppProductController;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const { success, product } = await productController.getProductById(productId);

    if (!success || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
} }