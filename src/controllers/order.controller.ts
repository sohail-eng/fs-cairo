import { CreateOrderDTO } from "@/@types/order.types";
import { StripeCheckoutDTO } from "@/@types/payment.types";
import { OrderDAO } from "@/persistence/daos/prisma/order.dao";
import { ProductDAO } from "@/persistence/daos/prisma/product.dao";
import { RestaurantDAO } from "@/persistence/daos/prisma/restaurant.dao";
import { OrderService } from "@/services/order.service";
import { PaymentService } from "@/services/payment.service";
import { IOrderController } from "./interfaces/i-order.controller";
import Stripe from "stripe";

const orderDAO = new OrderDAO();
const restaurantDAO = new RestaurantDAO();
const productDAO = new ProductDAO();

const orderService = new OrderService(orderDAO, restaurantDAO, productDAO);
const paymentService = new PaymentService(productDAO, orderDAO);

export class OrderController implements IOrderController {
  async createOrder(dto: CreateOrderDTO) {
    try {
      const order = await orderService.createOrder(dto);
      return { success: true, order };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message };
  } }

  async createStripeCheckout(dto: StripeCheckoutDTO) {
    try {
      const { sessionId } = await paymentService.createStripeCheckout(dto);
      return { success: true, sessionId };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message };
  } }

  async handleStripeWebhook(event: Stripe.Event) {
    try {
      const { order } = await paymentService.handleWebhook(event);
      return { success: true, order };
    } catch (error) {
      console.error("Error handling webhook:", error);
      return { success: false, message: "Webhook handler failed." };
  } }
  
  async getOrdersByCpf(cpf: string) {
    try {
      const orders = await orderDAO.findManyByCpf(cpf);
      return { success: true, orders };
    } catch (error) {
      console.error(error);
      return { success: false, message: (error as Error).message, orders: [] };
} } }