import { Navigate } from "react-router";
import { AuthRoute, PrivateRoute } from "../utils";

// Views
import MainLayout from "../layouts/MainLayout";
import NotFoundView from "../views/errors/NotFoundView";
import DashboardLayout from "../layouts/DashboardLayout";
import AccountView from "../views/Account";
import DashboardView from "../views/Dashboard";
import LoginView from "../views/auth/LoginView";
import ServiceListView from "../views/Service";
import BookingListView from "../views/Booking";
import SettingsView from "../views/Settings";
import StaffListView from "../views/Staff";

const routes = [
  {
    path: "partners",
    element: <DashboardLayout />,
    children: [
      {
        path: "account",
        element: <PrivateRoute path="/partners" component={AccountView} />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute path="/partners" component={DashboardView} />,
      },
      {
        path: "staff",
        element: <PrivateRoute path="/partners" component={StaffListView} />,
      },
      {
        path: "services",
        element: <PrivateRoute path="/partners" component={ServiceListView} />,
      },
      {
        path: "bookings",
        element: <PrivateRoute path="/partners" component={BookingListView} />,
      },
      {
        path: "settings",
        element: <PrivateRoute path="/partners" component={SettingsView} />,
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <AuthRoute path="/login" component={LoginView} />,
      },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/partners/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
