import { ProductWithDetails } from "@/persistence/daos/interfaces/i-product.dao";

export interface IProductController {
  getProductById(productId: string): Promise<{ success: boolean; product: ProductWithDetails | null; message?: string; }>;
}