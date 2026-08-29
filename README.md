# Delmela Sarbet — Website, Online Ordering & Admin Dashboard

A production-quality marketing site, online ordering flow, and admin dashboard
for **Delmela Sarbet**, an Ethiopian restaurant in Sarbet, Addis Ababa. Built
with React, TypeScript, Tailwind CSS, and React Router, using local mock data
so it works immediately with no backend.

## ⚠️ Important: this was built without the ability to run it

This project was generated in a sandboxed environment with **no internet
access**, so `npm install` could not be run and the dev server / production
build could not be started or verified here. Every file was written and
manually reviewed for consistency (matching imports/exports, prop types,
no leftover unused imports), but you should still run the checks below
yourself before treating it as final:

```bash
npm install
npm run typecheck   # tsc -b --noEmit
npm run build       # production build
npm run dev          # local preview at http://localhost:5173
```

Please report anything the type checker or build catches — none of that was
possible to verify without network access to install dependencies.

## What's real vs. placeholder

This is a fully functional site with **no real business data**. Everything
that needs the restaurant's confirmation is clearly marked:

| Area | Status |
|---|---|
| Menu items & prices | Demo data in `src/data/menuData.ts` — replace via Admin → Menu Management or by editing the file |
| Phone, email, address, hours | Placeholders in `src/data/restaurantInfo.ts`, editable via Admin → Settings |
| Delivery fees / coverage areas | Intentionally unset in `src/data/restaurantInfo.ts` (`deliverySettings`) — do not invent these |
| Google Maps embed | Placeholder panel on the Contact/Home pages — swap in a real embed URL once confirmed |
| Testimonials | Sample reviews, clearly labeled "Sample review" in the UI |
| Gallery / dish / hero photography | Branded placeholder graphics (`PlaceholderImage` component), each tagged "Sample visual" — replace with real photos, or upload real photos per-dish via Admin → Menu Management |
| Online payment | **Not implemented.** Orders are submitted for the restaurant to confirm by phone; no payment is processed |
| Admin login | Demo-only, client-side password check (see `src/context/AdminAuthContext.tsx`) — not secure, replace before real use |

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (custom brand palette: ink / parchment / wine / gold / clay / forest)
- React Router v6
- react-icons (Feather icon set)
- No backend — state is held in React Context and persisted to `localStorage`
  so the demo (menu edits, orders, settings) survives a page refresh

## Project structure

```
src/
  components/
    layout/    Navbar, Footer, ScrollToTop, PageTransition
    ui/        Buttons, badges, PlaceholderImage, DishImage, etc.
    home/      Homepage sections (Hero, FeaturedDishes, About, ...)
    menu/      Search, filters, dish card/modal
    cart/      Cart drawer + line items
    order/     Checkout form pieces
    admin/     Admin dashboard components
  pages/       One file per route, plus pages/admin/ for the dashboard
  context/     CartContext, AdminDataContext, AdminAuthContext, ToastContext
  data/        Mock/demo content — the single source of truth for placeholders
  hooks/       useScrollReveal, useLocalStorage, useSeo, structured data
  lib/         formatCurrency, submitOrder (backend integration point)
  types/       Shared TypeScript types
```

## Connecting a real backend

Order submission is centralized in `src/lib/submitOrder.ts`. It currently
simulates a network call and returns a mock order record. To connect a real
backend, replace the body of `submitOrder()` with a real `fetch` call — the
function signature is designed to stay the same so no calling code needs to
change. The same pattern applies to `src/pages/ContactPage.tsx`'s form
handler.

The Admin Dashboard's menu/orders/settings data currently lives in
`localStorage` via `useLocalStorage` (see `src/context/AdminDataContext.tsx`).
To connect a real backend, swap the `useLocalStorage` calls for data fetched
from your API, and route `addDish` / `updateDish` / `updateOrderStatus` etc.
to real API calls.

## Routes

**Public:** `/`, `/menu`, `/order`, `/order/confirmation`, `/about`,
`/gallery`, `/contact`

**Admin (password-protected demo):** `/admin/login`, `/admin` (overview),
`/admin/dishes`, `/admin/orders`, `/admin/settings`
