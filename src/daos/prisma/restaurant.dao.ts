import { db } from "@/lib/prisma";
import { Restaurant } from "@prisma/client";
import { IRestaurantDAO } from "../interfaces/i-restaurant.dao";

export class RestaurantDAO implements IRestaurantDAO {
  async findUniqueBySlug(slug: string): Promise<Restaurant | null> {
    return db.restaurant.findUnique({
      where: { slug },
  }); }

  async findUniqueWithCategories(slug: string): Promise<Restaurant | null> {
    return db.restaurant.findUnique({
      where: { slug },
      include: {
        categories: {
          include: { products: true },
}, }, }); } }