import { StripeCheckoutDTO } from "@/dtos/payment.dto";
import Stripe from "stripe";

export interface IPaymentService {
  createStripeCheckout(dto: StripeCheckoutDTO): Promise<{ sessionId: string }>;
  handleWebhook(event: Stripe.Event): Promise<{ received: boolean }>;
}