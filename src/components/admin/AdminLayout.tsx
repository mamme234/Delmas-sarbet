import type { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiGrid,
  FiBook,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import { useAdminAuth } from "../../context/AdminAuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/dishes", label: "Menu Management", icon: FiBook, end: false },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag, end: false },
  { to: "/admin/settings", label: "Restaurant Settings", icon: FiSettings, end: false },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-parchment-dim">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-ink/8 bg-ink px-5 py-8 text-parchment lg:flex">
        <div>
          <Link to="/admin" className="mb-10 flex items-center gap-2.5 px-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-display text-base italic text-gold">
              D
            </span>
            <span className="font-display text-lg">
              Delmela <span className="italic text-gold">Admin</span>
            </span>
          </Link>

          <nav className="flex flex-col gap-1" aria-label="Admin">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-parchment/10 text-gold" : "text-parchment/75 hover:bg-parchment/5"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-parchment/75 transition-colors hover:bg-parchment/5"
          >
            <FiExternalLink className="h-4 w-4" /> View Site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-parchment/75 transition-colors hover:bg-parchment/5"
          >
            <FiLogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink/8 bg-white/60 px-4 py-4 lg:hidden">
          <span className="font-display text-lg text-ink">Delmela Admin</span>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink/70"
          >
            <FiLogOut className="h-3.5 w-3.5" /> Log Out
          </button>
        </header>

        <nav
          className="flex gap-1 overflow-x-auto border-b border-ink/8 bg-white/60 px-4 py-2 lg:hidden"
          aria-label="Admin"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ${
                  isActive ? "bg-wine text-parchment" : "text-ink/60"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
