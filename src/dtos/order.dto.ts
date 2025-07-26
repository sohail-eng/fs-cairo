import { OrderType } from "@prisma/client";

export interface ProductDTO {
  id: string;
  quantity: number;
}

export interface CreateOrderDTO {
  customerName: string;
  customerCpf: string;
  orderType: OrderType;
  slug: string;
  products: ProductDTO[];
}