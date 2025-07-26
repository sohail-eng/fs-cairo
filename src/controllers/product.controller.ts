import { ProductDAO } from "@/persistence/daos/prisma/product.dao";
import { IProductDAO } from "@/persistence/daos/interfaces/i-product.dao";
import { IProductController } from "./interfaces/i-product.controller";

const productDAO: IProductDAO = new ProductDAO();

export class ProductController implements IProductController {
  async getProductById(productId: string) {
    try {
      const product = await productDAO.findById(productId);
      if (!product) {
        return { success: false, message: "Product not found.", product: null };
      }
      return { success: true, product };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message, product: null };
} } }