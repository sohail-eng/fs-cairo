import { Restaurant } from "@prisma/client";
import { RestaurantWithCategories } from "@/persistence/daos/interfaces/i-restaurant.dao";

export interface IRestaurantController {
  getAllRestaurants(): Promise<{ success: boolean; restaurants: Restaurant[]; message?: string }>;
  getRestaurantBySlug(slug: string): Promise<{ success: boolean; restaurant: Restaurant | null; message?: string }>;
  getRestaurantWithCategories(slug: string): Promise<{ success: boolean; restaurant: RestaurantWithCategories | null; message?: string; }>;
}