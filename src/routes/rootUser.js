import { Navigate } from "react-router";
import { AuthRoute, PrivateRoute } from "../utils";

// Views
import MainLayout from "../layouts/MainLayout";
import NotFoundView from "../views/errors/NotFoundView";
import DashboardLayout from "../layouts/DashboardLayout";
import AccountView from "../views/Account";
import CustomerListView from "../views/Customer";
import DashboardView from "../views/Dashboard";
import LoginView from "../views/auth/LoginView";
import ServiceListView from "../views/Service";
import BookingListView from "../views/Booking";
import SettingsView from "../views/Settings";
import VendorListView from "../views/Vendor";
import StaffListView from "../views/Staff";
import CategoryView from "../views/Category";

const routes = [
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "account",
        element: <PrivateRoute path="/admin" component={AccountView} />,
      },
      {
        path: "categories",
        element: <PrivateRoute path="/admin" component={CategoryView} />,
      },
      {
        path: "staff",
        element: <PrivateRoute path="/admin" component={StaffListView} />,
      },
      {
        path: "customers",
        element: <PrivateRoute path="/admin" component={CustomerListView} />,
      },
      {
        path: "vendors",
        element: <PrivateRoute path="/admin" component={VendorListView} />,
      },
      {
        path: "vendors/:vendorId",
        element: <PrivateRoute path="/admin" component={SettingsView} />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute path="/admin" component={DashboardView} />,
      },
      {
        path: "services",
        element: <PrivateRoute path="/admin" component={ServiceListView} />,
      },
      {
        path: "bookings",
        element: <PrivateRoute path="/admin" component={BookingListView} />,
      },
      {
        path: "settings",
        element: <PrivateRoute path="/admin" component={SettingsView} />,
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
      { path: "/", element: <Navigate to="/admin/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
