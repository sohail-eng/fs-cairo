"use server";

import { createOrderService } from "@/services/order.service";
import { OrderType } from "@prisma/client";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  orderType: OrderType;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  return await createOrderService(input);
};