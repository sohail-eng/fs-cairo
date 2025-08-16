import { NextResponse } from "next/server";
import { AppRestaurantController } from "@/controllers";

const restaurantController = AppRestaurantController;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { success, restaurant } = await restaurantController.getRestaurantWithCategories(slug);

    if (!success || !restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
} }