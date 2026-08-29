import { useState, Fragment } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { OrderRecord, OrderStatus } from "../../types";
import { formatEtb } from "../../lib/formatCurrency";
import { OrderStatusBadge, ORDER_STATUS_LABELS } from "./OrderStatusBadge";
import { Badge } from "../ui/Badge";

const STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];

interface OrderTableProps {
  orders: OrderRecord[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white/70">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/40">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/6">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            return (
              <Fragment key={order.id}>
                <tr className="align-middle">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink">#{order.id}</span>
                      {order.isDemo && <Badge tone="gold">Demo</Badge>}
                    </div>
                    <p className="text-xs text-ink/40">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{order.customer.fullName}</td>
                  <td className="px-4 py-3 capitalize text-ink/70">{order.customer.fulfillment}</td>
                  <td className="px-4 py-3 text-ink/70">{formatEtb(order.subtotal)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={order.status} />
                      <select
                        aria-label={`Change status for order ${order.id}`}
                        value={order.status}
                        onChange={(event) => onStatusChange(order.id, event.target.value as OrderStatus)}
                        className="rounded-lg border border-ink/12 bg-parchment px-2 py-1 text-xs text-ink/70 focus:border-gold focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {ORDER_STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/50 hover:bg-ink/5"
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      {isExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={6} className="bg-ink/[0.02] px-4 py-4">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
                            Customer Info
                          </h4>
                          <ul className="space-y-1 text-sm text-ink/70">
                            <li>
                              <span className="text-ink/40">Phone: </span>
                              {order.customer.phone}
                            </li>
                            {order.customer.fulfillment === "delivery" && (
                              <li>
                                <span className="text-ink/40">Address: </span>
                                {order.customer.address}
                              </li>
                            )}
                            {order.customer.notes && (
                              <li>
                                <span className="text-ink/40">Notes: </span>
                                {order.customer.notes}
                              </li>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
                            Items
                          </h4>
                          <ul className="space-y-1 text-sm text-ink/70">
                            {order.items.map((item) => (
                              <li key={item.dishId} className="flex justify-between">
                                <span>
                                  {item.quantity}× {item.name}
                                </span>
                                <span>{formatEtb(item.unitPrice * item.quantity)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
