import { IOrderService } from "./interfaces/i-order.service";
import { CreateOrderDTO } from "@/@types/order.types";
import { IOrderDAO } from "@/daos/interfaces/i-order.dao";
import { IRestaurantDAO } from "@/daos/interfaces/i-restaurant.dao";
import { IProductDAO } from "@/daos/interfaces/i-product.dao";
import { Order, Product } from "@prisma/client";
import { removeCpfPunctuation } from "@/app/[slug]/menu/helpers/cpf";

export class OrderService implements IOrderService {
  constructor(
    private orderDAO: IOrderDAO,
    private restaurantDAO: IRestaurantDAO,
    private productDAO: IProductDAO
  ) {}

  async createOrder(dto: CreateOrderDTO): Promise<Order> {
    const restaurant = await this.restaurantDAO.findUniqueBySlug(dto.slug);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    const productsFromDb = await this.productDAO.findManyByIds(
      dto.products.map((p) => p.id)
    );

    const productsWithQuantities = dto.products.map((productInCart) => {
      const productFromDb = productsFromDb.find(
        (p) => p.id === productInCart.id
      );
      if (!productFromDb) {
        throw new Error(`Product with ID ${productInCart.id} not found.`);
      }
      return {
        ...productFromDb,
        quantity: productInCart.quantity,
    }; });

    const total = productsWithQuantities.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const order = await this.orderDAO.create({
      status: "PENDING",
      customerName: dto.customerName,
      customerCpf: removeCpfPunctuation(dto.customerCpf),
      orderType: dto.orderType,
      total,
      restaurant: {
        connect: { id: restaurant.id },
      },
      orderProducts: {
        createMany: {
          data: productsWithQuantities.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
    })), }, }, });

    return order;
} }