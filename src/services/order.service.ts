import { OrderType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as OrderRepository from "@/repositories/order.repository";
import * as RestaurantRepository from "@/repositories/restaurant.repository";
import * as ProductRepository from "@/repositories/product.repository";
import { removeCpfPunctuation } from "@/app/[slug]/menu/helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  orderType: OrderType;
  slug: string;
}

export const createOrderService = async (input: CreateOrderInput) => {
  const restaurant = await RestaurantRepository.getRestaurantBySlug(input.slug);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await ProductRepository.getProductsByIds(
    input.products.map((product) => product.id)
  );

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  const order = await OrderRepository.createOrder({
    status: "PENDING",
    customerName: input.customerName,
    customerCpf: removeCpfPunctuation(input.customerCpf),
    orderProducts: {
      createMany: {
        data: productsWithPricesAndQuantities,
      },
    },
    total: productsWithPricesAndQuantities.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    ),
    orderType: input.orderType,
    restaurant: {
        connect: { id: restaurant.id }
  }, });

  revalidatePath(`/${input.slug}/orders`);
  return order;
};