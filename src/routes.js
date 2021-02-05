import React from "react";
import { Navigate } from "react-router-dom";

// Private & Auth Routes
import PrivateRoute from "./utils/PrivateRoute";
import AuthRoute from "./utils/AuthRoute";

// Views
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/Account";
import CustomerListView from "./views/Customer";
import DashboardView from "./views/Dashboard";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import ServiceListView from "./views/Service";
import BookingListView from "./views/Booking";
import SettingsView from "./views/Settings";
import VendorListView from "./views/Vendor";

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
        path: "customers",
        element: <PrivateRoute path="/partners" component={CustomerListView} />,
      },
      {
        path: "vendors",
        element: <PrivateRoute path="/partners" component={VendorListView} />,
      },
      {
        path: "vendors/:vendorId",
        element: <PrivateRoute path="/partners" component={SettingsView} />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute path="/partners" component={DashboardView} />,
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
