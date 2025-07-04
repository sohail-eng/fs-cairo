import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  return db.restaurant.findUnique({
    where: { slug },
}); };

export const getRestaurantWithCategories = async (slug: string) => {
  return db.restaurant.findUnique({
    where: { slug },
    include: {
      categories: {
        include: { products: true },
}, }, }); };
