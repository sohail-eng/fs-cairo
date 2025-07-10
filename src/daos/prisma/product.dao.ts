import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { IProductDAO } from "../interfaces/i-product.dao";

export class ProductDAO implements IProductDAO {
  async findById(productId: string): Promise<Product | null> {
    return db.product.findUnique({
      where: { id: productId },
  }); }

  async findManyByIds(productIds: string[]): Promise<Product[]> {
    return db.product.findMany({
      where: {
        id: {
          in: productIds,
}, }, }); } }