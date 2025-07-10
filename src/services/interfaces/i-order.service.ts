import { CreateOrderDTO } from "@/@types/order.types";
import { Order } from "@prisma/client";

export interface IOrderService {
  createOrder(dto: CreateOrderDTO): Promise<Order>;
}