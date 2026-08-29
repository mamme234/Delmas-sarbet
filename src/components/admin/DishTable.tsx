import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import type { Dish } from "../../types";
import { formatEtb } from "../../lib/formatCurrency";
import { DishImage } from "../ui/DishImage";
import { Badge } from "../ui/Badge";

interface DishTableProps {
  dishes: Dish[];
  onEdit: (dish: Dish) => void;
  onDelete: (dish: Dish) => void;
  onToggleAvailability: (dish: Dish) => void;
}

export function DishTable({ dishes, onEdit, onDelete, onToggleAvailability }: DishTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/8 bg-white/70">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/40">
          <tr>
            <th className="px-4 py-3 font-medium">Dish</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/6">
          {dishes.map((dish) => (
            <tr key={dish.id} className="align-middle">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <DishImage dish={dish} className="h-10 w-10 shrink-0" rounded="rounded-lg" />
                  <div>
                    <p className="font-medium text-ink">{dish.name}</p>
                    {dish.isSignature && <Badge tone="gold" className="mt-1">Signature</Badge>}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-ink/70">{dish.category}</td>
              <td className="px-4 py-3 text-ink/70">{formatEtb(dish.price)}</td>
              <td className="px-4 py-3">
                <Badge tone={dish.isAvailable ? "forest" : "muted"}>
                  {dish.isAvailable ? "Available" : "Disabled"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onToggleAvailability(dish)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                    aria-label={dish.isAvailable ? `Disable ${dish.name}` : `Enable ${dish.name}`}
                    title={dish.isAvailable ? "Disable" : "Enable"}
                  >
                    {dish.isAvailable ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(dish)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                    aria-label={`Edit ${dish.name}`}
                    title="Edit"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(dish)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/50 transition-colors hover:bg-wine/10 hover:text-wine"
                    aria-label={`Delete ${dish.name}`}
                    title="Delete"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
