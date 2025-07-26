import { Prisma, Order, OrderStatus } from "@prisma/client";

export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true,
        logoUrl: true,
    }; };
    
    orderProducts: {
      include: {
        product: true;
}; }; }; }>;

export interface IOrderDAO {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  
  updateStatus(
    orderId: number,
    status: "PAYMENT_CONFIRMED" | "PAYMENT_FAILED"
  ): Promise<Order & { restaurant: { slug: string } }>;
  
  findManyByCpf(cpf: string): Promise<OrderWithDetails[]>;
}