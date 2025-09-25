import { OrderConfirmation } from "@/components/layout/order-confirmation/order-confirmation";
import { getOrder } from "@/actions/checkout-actions";
import { notFound } from "next/navigation";

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <OrderConfirmation order={order} />
      </div>
    </>
  );
}
