import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@views/dashboard/Dashboard";
import Account from "@/views/account/Account";
import InitializePasswordReset from "@/views/initialize-password-reset/InitializePasswordReset";
import Login from "@/views/login/Login";
import ResetPassword from "@/views/reset-password/ResetPassword";
import Users from "@/views/users/Users";
import Root from "../layout/Root";
import Locations from "@/views/locations/Locations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/locations",
        element: <Locations />
      },
      {
        path: "/account",
        element: <Account />
      },
    ]
  },
  {
    path: "/initialize-password-reset",
    element: <InitializePasswordReset />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
