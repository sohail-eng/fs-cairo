import { IRestaurantDAO } from "@/persistence/daos/interfaces/i-restaurant.dao";
import { RestaurantDAO } from "@/persistence/daos/prisma/restaurant.dao";
import { IRestaurantController } from "./interfaces/i-restaurant.controller";

const restaurantDAO: IRestaurantDAO = new RestaurantDAO();

export class RestaurantController implements IRestaurantController {
  async getAllRestaurants() {
    try {
      const restaurants = await restaurantDAO.findMany();
      return { success: true, restaurants };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message, restaurants: [] };
  } }

  async getRestaurantBySlug(slug: string) {
    try {
      const restaurant = await restaurantDAO.findUniqueBySlug(slug);
      if (!restaurant) {
        return { success: false, message: "Restaurant not found.", restaurant: null };
      }
      return { success: true, restaurant };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message, restaurant: null };
  } }

  async getRestaurantWithCategories(slug: string) {
    try {
      const restaurant = await restaurantDAO.findUniqueWithCategories(slug);
      if (!restaurant) {
        return { success: false, message: "Restaurant not found.", restaurant: null };
      }
      return { success: true, restaurant };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message, restaurant: null };
} } }