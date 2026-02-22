import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { UserPage } from "./pages/UserPage";
import { AppLayout } from "./layouts/AppLayout";
import { OrderPage } from "./pages/OrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/user",
            element: <UserPage />,
          },
          {
            path: "/order",
            element: <OrderPage />,
          },
        ],
      },
    ],
  },
]);
