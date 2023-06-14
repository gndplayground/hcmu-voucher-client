import { GuardRoute, SectionLoading } from "@components";
import { BaseLayout } from "@layouts/Base";
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomeLazy = React.lazy(() =>
  import("../pages/Home").then((module) => ({
    default: module.Home,
  }))
);

const LoginLazy = React.lazy(() =>
  import("../pages/Login").then((module) => ({
    default: module.Login,
  }))
);

const CampaignDetailLazy = React.lazy(() =>
  import("../pages/CampaignDetail").then((module) => ({
    default: module.CampaignDetail,
  }))
);

const MyVouchersLazy = React.lazy(() =>
  import("../pages/MyVouchers").then((module) => ({
    default: module.MyVouchers,
  }))
);

const BrandsLazy = React.lazy(() =>
  import("../pages/Brands").then((module) => ({
    default: module.Brands,
  }))
);

const BrandDetailLazy = React.lazy(() =>
  import("../pages/BrandDetail").then((module) => ({
    default: module.BrandDetail,
  }))
);

const VouchersLazy = React.lazy(() =>
  import("../pages/Vouchers").then((module) => ({
    default: module.Vouchers,
  }))
);

function SupportSuspense(props: { children: React.ReactNode }) {
  return <Suspense fallback={<SectionLoading />}>{props.children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLazy />,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomeLazy />,
      },
      {
        path: "/campaigns/:id",
        element: (
          <SupportSuspense>
            <CampaignDetailLazy />
          </SupportSuspense>
        ),
      },
      {
        path: "/my-vouchers",
        element: (
          <SupportSuspense>
            <GuardRoute>{() => <MyVouchersLazy />}</GuardRoute>
          </SupportSuspense>
        ),
      },
      {
        path: "/brands",
        element: (
          <SupportSuspense>
            <BrandsLazy />
          </SupportSuspense>
        ),
      },
      {
        path: "/brands/:id",
        element: (
          <SupportSuspense>
            <BrandDetailLazy />
          </SupportSuspense>
        ),
      },
      {
        path: "/vouchers",
        element: (
          <SupportSuspense>
            <VouchersLazy />
          </SupportSuspense>
        ),
      },
    ],
  },
]);
