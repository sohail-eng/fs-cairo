import { CreateOrderDTO } from "@/@types/order.types";
import { StripeCheckoutDTO } from "@/@types/payment.types";
import { OrderController } from "./order.controller";
import { IOrderController } from "./interfaces/i-order.controller";
import Stripe from "stripe";

export class OrderControllerDecorator implements IOrderController {
  private decoratee: IOrderController;

  constructor() {
    this.decoratee = new OrderController();
  }

  async createOrder(dto: CreateOrderDTO) {
    console.log(`[Decorator] Chamando createOrder com o DTO:`, dto);
    return this.decoratee.createOrder(dto);
  }

  async createStripeCheckout(dto: StripeCheckoutDTO) {
    console.log(`[Decorator] Chamando createStripeCheckout para o pedido ID: ${dto.orderId}`);
    return this.decoratee.createStripeCheckout(dto);
  }

  async handleStripeWebhook(event: Stripe.Event) {
    console.log(`[Decorator] Recebendo evento do Stripe: ${event.type}`);
    return this.decoratee.handleStripeWebhook(event);
  }

  async getOrdersByCpf(cpf: string) {
    console.log(`[Decorator] Buscando pedidos para o CPF: ${cpf}`);
    return this.decoratee.getOrdersByCpf(cpf);
} }