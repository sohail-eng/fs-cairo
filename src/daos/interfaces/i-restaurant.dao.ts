import { Restaurant } from "@prisma/client";

export interface IRestaurantDAO {
  findUniqueBySlug(slug: string): Promise<Restaurant | null>;
  findUniqueWithCategories(slug: string): Promise<Restaurant | null>;
}