import { Order, OrderStatus, Prisma } from "@prisma/client";

export interface IOrderDAO {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  updateStatus(
    orderId: number,
    status: "PAYMENT_CONFIRMED" | "PAYMENT_FAILED",
  ): Promise<Order & { restaurant: { slug: string } }>;
  findManyByCpf(cpf: string): Promise<Order[]>;
}