import { Prisma, Product } from "@prisma/client";

export type ProductWithDetails = Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          logoUrl: true,
          slug: true,
}, }, }; }>;

export interface IProductDAO {
  findById(productId: string): Promise<ProductWithDetails | null>;
  findManyByIds(productIds: string[]): Promise<Product[]>;
}