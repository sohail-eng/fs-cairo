import { db } from "@/lib/prisma";
import { Restaurant } from "@prisma/client";
import { IRestaurantDAO, RestaurantWithCategories } from "../interfaces/i-restaurant.dao";

export class RestaurantDAO implements IRestaurantDAO {
  async findMany(): Promise<Restaurant[]> {
    return db.restaurant.findMany({});
  }

  async findUniqueBySlug(slug: string): Promise<Restaurant | null> {
    return db.restaurant.findUnique({
      where: { slug },
  }); }

  async findUniqueWithCategories(slug: string): Promise<RestaurantWithCategories | null> {
    return db.restaurant.findUnique({
      where: { slug },
      include: {
        categories: {
          include: { products: true },
}, }, }); } }