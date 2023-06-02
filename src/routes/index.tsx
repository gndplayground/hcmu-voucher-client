import { BaseLayout } from "@layouts/Base";
import React from "react";
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
        element: <CampaignDetailLazy />,
      },
    ],
  },
]);
