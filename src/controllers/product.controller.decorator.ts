import { ProductController } from "./product.controller";
import { IProductController } from "./interfaces/i-product.controller";

export class ProductControllerDecorator implements IProductController {
  private decoratee: IProductController;

  constructor() {
    this.decoratee = new ProductController();
  }

  async getProductById(productId: string) {
    console.log(`[Decorator] Chamando getProductById com o ID: ${productId}`);
    return this.decoratee.getProductById(productId);
} }