import type { OrderStatus } from "../../types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  ready_for_pickup: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gold/15 text-gold-dark border-gold/30",
  confirmed: "bg-ink/8 text-ink/70 border-ink/15",
  preparing: "bg-clay/10 text-clay-dark border-clay/25",
  out_for_delivery: "bg-wine/10 text-wine border-wine/25",
  ready_for_pickup: "bg-wine/10 text-wine border-wine/25",
  completed: "bg-forest/10 text-forest border-forest/25",
  cancelled: "bg-ink/5 text-ink/40 border-ink/10 line-through",
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
