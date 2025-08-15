"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { OrderType } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";
import {
  createOrderAction,
  createStripeCheckoutAction,
} from "@/app/actions/order.actions";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "CPF is required.",
    })
    .refine((value) => isValidCpf(value), {
      message: "Invalid CPF.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    try {
      const orderType = searchParams.get("orderType") as OrderType;

      const orderResponse = await createOrderAction({
        customerCpf: data.cpf,
        customerName: data.name,
        orderType,
        products: products.map((p) => ({
          id: p.id,
          quantity: p.quantity,
        })),
        slug,
      });

      if (!orderResponse.success || !orderResponse.order) {
        toast.error(orderResponse.message || "Failed to create order.");
        return;
      }

      const stripeResponse = await createStripeCheckoutAction({
        products,
        orderId: orderResponse.order.id,
        slug,
        orderType,
        cpf: data.cpf,
      });

      if (!stripeResponse.success || !stripeResponse.sessionId) {
        toast.error(stripeResponse.message || "Failed to create checkout session.");
        return;
      }

      const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
      if (!stripePublicKey) {
        toast.error("Stripe public key is not configured.");
        return;
      }

      const stripe = await loadStripe(stripePublicKey);
      await stripe?.redirectToCheckout({
        sessionId: stripeResponse.sessionId,
      });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
  } };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{/* opcional */}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Complete Order</DrawerTitle>
          <DrawerDescription>
            Please provide your details to complete the order and proceed to payment.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF (Br ID)</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Enter your CPF to locate your order"
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="pt-4">
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                  Continue to Payment
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full" variant="outline" type="button">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
); };

export default FinishOrderDialog;