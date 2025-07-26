import { NextResponse } from "next/server";
import { AppOrderController } from "@/controllers";

const orderController = AppOrderController;

// Rota para CRIAR um pedido
// POST /api/orders
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderResult = await orderController.createOrder(body);

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json({ message: orderResult.message || "Failed to create order" }, { status: 400 });
    }

    const checkoutResult = await orderController.createStripeCheckout({
      orderId: orderResult.order.id,
      products: body.products,
      slug: body.slug,
      orderType: body.orderType,
      cpf: body.customerCpf,
    });

    if (!checkoutResult.success || !checkoutResult.sessionId) {
        return NextResponse.json({ message: checkoutResult.message || "Failed to create Stripe checkout" }, { status: 500 });
    }

    return NextResponse.json({ sessionId: checkoutResult.sessionId });

  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
} }

// Rota para BUSCAR pedidos por CPF
// GET /api/orders?cpf=12345678900
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cpf = searchParams.get('cpf');

        if (!cpf) {
            return NextResponse.json({ message: "CPF query parameter is required" }, { status: 400 });
        }

        const { success, orders } = await orderController.getOrdersByCpf(cpf);

        if(!success) {
            return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
        }

        return NextResponse.json(orders);

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
} }