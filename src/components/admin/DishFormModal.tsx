import { useEffect, useState, type FormEvent } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import type { Dish, MenuCategory, MenuCategoryId } from "../../types";
import { DishImage } from "../ui/DishImage";

interface DishFormModalProps {
  dish: Dish | null;
  categories: MenuCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (dish: Dish) => void;
}

type DraftDish = Omit<Dish, "price"> & { price: string };

function emptyDraft(categories: MenuCategory[]): DraftDish {
  return {
    id: "",
    name: "",
    description: "",
    category: categories[0]?.id ?? ("ethiopian" as MenuCategoryId),
    price: "",
    imageUrl: "new-dish",
    isAvailable: true,
    isSignature: false,
    isVegetarian: false,
    isSpicy: false,
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function DishFormModal({ dish, categories, isOpen, onClose, onSave }: DishFormModalProps) {
  const [draft, setDraft] = useState<DraftDish>(() => emptyDraft(categories));

  useEffect(() => {
    if (dish) {
      setDraft({ ...dish, price: String(dish.price) });
    } else {
      setDraft(emptyDraft(categories));
    }
  }, [dish, categories, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((prev) => ({ ...prev, imageDataUrl: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const priceNumber = Number(draft.price);
    const finalDish: Dish = {
      ...draft,
      id: draft.id || slugify(draft.name) || `dish-${Date.now()}`,
      price: Number.isFinite(priceNumber) ? priceNumber : 0,
    };
    onSave(finalDish);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-parchment shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4">
          <h3 className="font-display text-lg text-ink">{dish ? "Edit Dish" : "Add Dish"}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/50 hover:bg-ink/5"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <DishImage
                dish={{ name: draft.name || "New dish", imageUrl: draft.imageUrl, imageDataUrl: draft.imageDataUrl }}
                className="h-20 w-20 shrink-0"
                rounded="rounded-xl"
              />
              <label className="btn-secondary cursor-pointer text-sm">
                <FiUpload className="h-4 w-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event.target.files?.[0])}
                />
              </label>
            </div>

            <div>
              <label htmlFor="dish-name" className="mb-1.5 block text-sm font-medium text-ink">
                Dish name
              </label>
              <input
                id="dish-name"
                required
                value={draft.name}
                onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                className="input-field"
                placeholder="e.g. Doro Wat"
              />
            </div>

            <div>
              <label htmlFor="dish-description" className="mb-1.5 block text-sm font-medium text-ink">
                Description
              </label>
              <textarea
                id="dish-description"
                required
                value={draft.description}
                onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                className="input-field min-h-[84px] resize-none"
                placeholder="Short, appetizing description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dish-category" className="mb-1.5 block text-sm font-medium text-ink">
                  Category
                </label>
                <select
                  id="dish-category"
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, category: event.target.value as MenuCategoryId }))
                  }
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dish-price" className="mb-1.5 block text-sm font-medium text-ink">
                  Price (ETB)
                </label>
                <input
                  id="dish-price"
                  required
                  type="number"
                  min={0}
                  step="1"
                  value={draft.price}
                  onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
                  className="input-field"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["isAvailable", "Available"],
                  ["isSignature", "Signature"],
                  ["isVegetarian", "Vegetarian"],
                  ["isSpicy", "Spicy"],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-2 text-sm text-ink/70"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(draft[key])}
                    onChange={(event) => setDraft((prev) => ({ ...prev, [key]: event.target.checked }))}
                    className="h-4 w-4 rounded border-ink/30 text-wine focus:ring-gold"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-ink/8 px-6 py-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {dish ? "Save Changes" : "Add Dish"}
          </button>
        </div>
      </form>
    </div>
  );
}
