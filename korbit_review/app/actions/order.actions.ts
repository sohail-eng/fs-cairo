"use server";

import { revalidatePath } from "next/cache";
import { CreateOrderDTO } from "@/dtos/order.dto";
import { StripeCheckoutDTO } from "@/dtos/payment.dto";
import { AppOrderController } from "@/controllers";

const orderController = AppOrderController;

export const createOrderAction = async (dto: CreateOrderDTO) => {
  const result = await orderController.createOrder(dto);
  if (result.success) {
    revalidatePath(`/${dto.slug}/orders`);
  }
  return result;
};

export const createStripeCheckoutAction = async (dto: StripeCheckoutDTO) => {
  return await orderController.createStripeCheckout(dto);
};