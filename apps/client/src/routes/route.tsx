import { lazy } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { MainLayout } from "@/components/layouts/main-layout";
import { HomePage } from "@/pages/home-page";
import { createBrowserRouter } from "react-router";
import { SuspenseWrapper } from "@/components/shared/suspense-warpper";
import { AuthProviders } from "@/providers/auth-ui-provider";

const NotFound = lazy(() => import("@/pages/not-found-page"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const AccoutSettingPage = lazy(() => import("@/pages/account-setting-page"));
const SecuritySettingPage = lazy(() => import("@/pages/security-setting-page"));
const ShopPage = lazy(() => import("@/pages/shop-page"));
const ProductDetails = lazy(() => import("@/pages/product-details-page"));
const AboutUs = lazy(() => import("@/pages/about-us-page"));
const ContactUs = lazy(() => import("@/pages/contact-us-page"));
const Checkout = lazy(() => import("@/pages/checkout-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProviders>
        <MainLayout />
      </AuthProviders>
    ),
    errorElement: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile/settings",
        element: (
          <SuspenseWrapper>
            <AccoutSettingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/profile/security",
        element: (
          <SuspenseWrapper>
            <SecuritySettingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/shop",
        element: (
          <SuspenseWrapper>
            <ShopPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/shop/:id",
        element: (
          <SuspenseWrapper>
            <ProductDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/about-us",
        element: (
          <SuspenseWrapper>
            <AboutUs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <SuspenseWrapper>
            <ContactUs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/checkout",
        element: (
          <SuspenseWrapper>
            <Checkout />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/auth/:pathname",
    element: (
      <AuthProviders>
        <AuthLayout />
      </AuthProviders>
    ),
    errorElement: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <AuthPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <AuthPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
