import { CreateOrderDTO } from "@/dtos/order.dto";
import { Order } from "@prisma/client";

export interface IOrderService {
  createOrder(dto: CreateOrderDTO): Promise<Order>;
}