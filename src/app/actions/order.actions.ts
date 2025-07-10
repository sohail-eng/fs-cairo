"use server";

import { revalidatePath } from "next/cache";
import { CreateOrderDTO } from "@/@types/order.types";
import { StripeCheckoutDTO } from "@/@types/payment.types";

import { OrderDAO } from "@/daos/prisma/order.dao";
import { RestaurantDAO } from "@/daos/prisma/restaurant.dao";
import { ProductDAO } from "@/daos/prisma/product.dao";
import { OrderService } from "@/services/order.service";
import { PaymentService } from "@/services/payment.service";

const orderDAO = new OrderDAO();
const restaurantDAO = new RestaurantDAO();
const productDAO = new ProductDAO();

const orderService = new OrderService(orderDAO, restaurantDAO, productDAO);
const paymentService = new PaymentService(productDAO, orderDAO);

export const createOrderAction = async (dto: CreateOrderDTO) => {
  try {
    const order = await orderService.createOrder(dto);
    revalidatePath(`/${dto.slug}/orders`);
    return { success: true, order };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
} };

export const createStripeCheckoutAction = async (dto: StripeCheckoutDTO) => {
  try {
    const { sessionId } = await paymentService.createStripeCheckout(dto);
    return { success: true, sessionId };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
} };