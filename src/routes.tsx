import { createBrowserRouter, redirect } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useUserStore } from "./state/user.ts";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Login />,
    loader: () => {
      const isLoggedIn = useUserStore.getState().isLoggedIn;
      if (isLoggedIn) {
        return redirect(ROUTES.DASHBOARD);
      }

      return null;
    },
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    loader: () => {
      const isLoggedIn = useUserStore.getState().isLoggedIn;
      if (!isLoggedIn) {
        return redirect(ROUTES.HOME);
      }

      return null;
    },
  },
]);

export default router;
