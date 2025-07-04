import { db } from "@/lib/prisma";

export const getProductById = async (productId: string) => {
  return db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          logoUrl: true,
          slug: true,
}, }, }, }); };

export const getProductsByIds = async (productIds: string[]) => {
  return db.product.findMany({
    where: {
      id: {
        in: productIds,
}, }, }); };