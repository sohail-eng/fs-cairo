import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";
import { OrderController } from "@/controllers/order.controller";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const orderController = new OrderController();

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const { orders } = await orderController.getOrdersByCpf(removeCpfPunctuation(cpf));

  return <OrderList orders={orders} />;
};

export default OrdersPage;