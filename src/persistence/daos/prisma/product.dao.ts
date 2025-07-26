import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { IProductDAO } from "../interfaces/i-product.dao";

export class ProductDAO implements IProductDAO {
  async findById(productId: string): Promise<any | null> {
    return db.product.findUnique({
      where: { id: productId },
      include: {
        restaurant: {
          select: {
            name: true,
            logoUrl: true,
            slug: true,
  }, }, }, }); }

  async findManyByIds(productIds: string[]): Promise<Product[]> {
    return db.product.findMany({
      where: {
        id: {
          in: productIds,
}, }, }); } }