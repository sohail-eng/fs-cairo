import { RestaurantController } from "./restaurant.controller";
import { IRestaurantController } from "./interfaces/i-restaurant.controller";

export class RestaurantControllerDecorator implements IRestaurantController {
  private decoratee: IRestaurantController;

  constructor() {
    this.decoratee = new RestaurantController();
  }

  async getAllRestaurants() {
    console.log("[Decorator] Chamando getAllRestaurants...");
    return this.decoratee.getAllRestaurants();
  }

  async getRestaurantBySlug(slug: string) {
    console.log(`[Decorator] Chamando getRestaurantBySlug com o slug: ${slug}`);
    return this.decoratee.getRestaurantBySlug(slug);
  }

  async getRestaurantWithCategories(slug: string) {
    console.log(`[Decorator] Chamando getRestaurantWithCategories com o slug: ${slug}`);
    return this.decoratee.getRestaurantWithCategories(slug);
} }