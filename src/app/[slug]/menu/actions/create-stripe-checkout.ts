"use server";

import { createStripeCheckoutService } from "@/services/payment.service";
import { OrderType } from "@prisma/client";
import { CartProduct } from "../contexts/cart";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  orderType: OrderType;
  cpf: string;
}

export const createStripeCheckout = async (input: CreateStripeCheckoutInput) => {
  return await createStripeCheckoutService(input);
};