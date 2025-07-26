import { Prisma, Restaurant } from "@prisma/client";

export type RestaurantWithCategories = Prisma.RestaurantGetPayload<{
  include: {
    categories: {
      include: {
        products: true;
}; }; }; }>;

export interface IRestaurantDAO {
  findMany(): Promise<Restaurant[]>;
  findUniqueBySlug(slug: string): Promise<Restaurant | null>;
  findUniqueWithCategories(slug: string): Promise<RestaurantWithCategories | null>;
}