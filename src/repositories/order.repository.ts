import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return db.order.create({
    data,
}); };

export const updateOrderStatus = async (orderId: number, status: "PAYMENT_CONFIRMED" | "PAYMENT_FAILED") => {
    return await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status,
        },
        include: {
          restaurant: {
            select: {
              slug: true,
}, }, }, }); }

export const getOrdersByCpf = async (cpf: string) => {
  return db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: cpf,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          logoUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
}, }, }, }); };