import { NextResponse } from "next/server";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";
import { OrderController } from "@/controllers/order.controller";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const orderController = new OrderController();

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const text = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(text, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`Webhook Error: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  const result = await orderController.handleStripeWebhook(event);

  if (result.success && result.order) {
    revalidatePath(`/${result.order.restaurant.slug}/orders`);
  }

  if (!result.success) {
      return new NextResponse(result.message, { status: 500 });
  }

  return NextResponse.json({ received: true });
}