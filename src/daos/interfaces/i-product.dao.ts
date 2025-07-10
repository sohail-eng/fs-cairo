import { Product } from "@prisma/client";

export interface IProductDAO {
  findById(productId: string): Promise<Product | null>;
  findManyByIds(productIds: string[]): Promise<Product[]>;
}