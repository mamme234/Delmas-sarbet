import type { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminDataProvider } from "./context/AdminDataContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ToastProvider } from "./context/ToastContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { PageTransition } from "./components/layout/PageTransition";
import { RequireAdminAuth } from "./components/admin/RequireAdminAuth";

import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { OrderPage } from "./pages/OrderPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminDishesPage } from "./pages/admin/AdminDishesPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

function PublicSiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AdminAuthProvider>
        <AdminDataProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<PublicSiteLayout><HomePage /></PublicSiteLayout>} />
              <Route path="/menu" element={<PublicSiteLayout><MenuPage /></PublicSiteLayout>} />
              <Route path="/order" element={<PublicSiteLayout><OrderPage /></PublicSiteLayout>} />
              <Route
                path="/order/confirmation"
                element={<PublicSiteLayout><OrderConfirmationPage /></PublicSiteLayout>}
              />
              <Route path="/about" element={<PublicSiteLayout><AboutPage /></PublicSiteLayout>} />
              <Route path="/gallery" element={<PublicSiteLayout><GalleryPage /></PublicSiteLayout>} />
              <Route path="/contact" element={<PublicSiteLayout><ContactPage /></PublicSiteLayout>} />

              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <RequireAdminAuth>
                    <AdminDashboardPage />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/admin/dishes"
                element={
                  <RequireAdminAuth>
                    <AdminDishesPage />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequireAdminAuth>
                    <AdminOrdersPage />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <RequireAdminAuth>
                    <AdminSettingsPage />
                  </RequireAdminAuth>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </CartProvider>
        </AdminDataProvider>
      </AdminAuthProvider>
    </ToastProvider>
  );
}
