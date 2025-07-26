import { db } from "@/lib/prisma";
import { Order, OrderStatus, Prisma } from "@prisma/client";
import { IOrderDAO, OrderWithDetails } from "../interfaces/i-order.dao";

export class OrderDAO implements IOrderDAO {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return db.order.create({
      data,
    });
  }

  async updateStatus(
    orderId: number,
    status: "PAYMENT_CONFIRMED" | "PAYMENT_FAILED"
  ): Promise<Order & { restaurant: { slug: string } }> {
    return await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        restaurant: {
          select: {
            slug: true,
  }, }, }, }); }

  async findManyByCpf(cpf: string): Promise<OrderWithDetails[]> {
    return db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        customerCpf: cpf,
      },
      include: {
        restaurant: {
          select: {
            name: true,
            logoUrl: true,
        }, },
        
        orderProducts: {
          include: {
            product: true,
}, }, }, }); } }