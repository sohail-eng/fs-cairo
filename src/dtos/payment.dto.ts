import { OrderType } from "@prisma/client";
import { CartProduct } from "@/app/[slug]/menu/contexts/cart";

export interface StripeCheckoutDTO {
  products: CartProduct[];
  orderId: number;
  slug: string;
  orderType: OrderType;
  cpf: string;
}