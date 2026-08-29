import { useState, type FormEvent } from "react";
import type { RestaurantInfo, RestaurantHours } from "../../types";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";

interface RestaurantSettingsFormProps {
  settings: RestaurantInfo;
  onSave: (updates: Partial<RestaurantInfo>) => void;
}

export function RestaurantSettingsForm({ settings, onSave }: RestaurantSettingsFormProps) {
  const [form, setForm] = useState<RestaurantInfo>(settings);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const handleHoursChange = (index: number, updates: Partial<RestaurantHours>) => {
    setForm((prev) => ({
      ...prev,
      hours: prev.hours.map((entry, i) => (i === index ? { ...entry, ...updates } : entry)),
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(form);
    setSavedAt(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <PlaceholderNotice>
        These fields currently hold placeholder values. Update them with confirmed business
        information — changes are saved locally in this demo and immediately reflected across
        the public site.
      </PlaceholderNotice>

      <section className="rounded-2xl border border-ink/8 bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg text-ink">Contact &amp; Location</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-ink">Address</label>
            <input
              value={form.addressLine}
              onChange={(event) => setForm((prev) => ({ ...prev, addressLine: event.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Phone</label>
            <input
              value={form.phonePlaceholder}
              onChange={(event) => setForm((prev) => ({ ...prev, phonePlaceholder: event.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
            <input
              value={form.emailPlaceholder}
              onChange={(event) => setForm((prev) => ({ ...prev, emailPlaceholder: event.target.value }))}
              className="input-field"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-ink">Google Maps Embed URL</label>
            <input
              value={form.mapsEmbedUrlPlaceholder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, mapsEmbedUrlPlaceholder: event.target.value }))
              }
              className="input-field"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-ink/8 bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg text-ink">Opening Hours</h3>
        <div className="flex flex-col gap-3">
          {form.hours.map((entry, index) => (
            <div key={entry.day} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={entry.day}
                onChange={(event) => handleHoursChange(index, { day: event.target.value })}
                className="input-field"
                aria-label={`Day group ${index + 1}`}
              />
              <input
                value={entry.hours}
                onChange={(event) => handleHoursChange(index, { hours: event.target.value })}
                className="input-field"
                aria-label={`Hours for ${entry.day}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-ink/8 bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg text-ink">Social Media</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Instagram</label>
            <input
              value={form.instagramHandlePlaceholder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, instagramHandlePlaceholder: event.target.value }))
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Facebook</label>
            <input
              value={form.facebookHandlePlaceholder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, facebookHandlePlaceholder: event.target.value }))
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Telegram</label>
            <input
              value={form.telegramHandlePlaceholder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, telegramHandlePlaceholder: event.target.value }))
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">TikTok</label>
            <input
              value={form.tiktokHandlePlaceholder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, tiktokHandlePlaceholder: event.target.value }))
              }
              className="input-field"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">
          Save Settings
        </button>
        {savedAt && <span className="text-sm text-forest">Saved locally.</span>}
      </div>
    </form>
  );
}
