import { createBrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Login />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
]);

export default router;
