import type { MenuCategory, MenuCategoryId } from "../../types";

interface CategoryManagerProps {
  categories: MenuCategory[];
  enabledCategoryIds: MenuCategoryId[];
  onToggle: (id: MenuCategoryId) => void;
}

export function CategoryManager({ categories, enabledCategoryIds, onToggle }: CategoryManagerProps) {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white/70 p-5">
      <h3 className="mb-1 font-display text-lg text-ink">Categories</h3>
      <p className="mb-4 text-sm text-ink/50">
        Disabled categories are hidden from the public menu and ordering pages.
      </p>
      <div className="flex flex-col divide-y divide-ink/6">
        {categories.map((category) => {
          const isEnabled = enabledCategoryIds.includes(category.id);
          return (
            <div key={category.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-ink">{category.label}</p>
                <p className="text-xs text-ink/45">{category.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => onToggle(category.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                  isEnabled ? "bg-forest" : "bg-ink/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    isEnabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
