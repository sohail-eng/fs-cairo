import { NextResponse } from "next/server";
import { AppRestaurantController } from "@/controllers";

const restaurantController = AppRestaurantController;

export async function GET() {
  try {
    const { success, restaurants } = await restaurantController.getAllRestaurants();

    if (!success) {
      return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }

    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
} }